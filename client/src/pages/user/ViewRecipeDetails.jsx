import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeBySlug } from "../../store/slices/recipeSlice";
import { Box, Tab, Typography, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
const ViewRecipeDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [person, setPerson] = useState(1);

  const { recipeBySlug, isLoading } = useSelector((state) => state?.recipe);

  const {
    name = "",
    img_Base64 = "",
    ingredients = [],
    description = "",
  } = recipeBySlug?.recipe ?? {};

  useEffect(() => {
    dispatch(getRecipeBySlug(slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <p>loading........</p>;
  }

  return (
    <>
      <Typography variant="h4" textAlign={"center"}>
        {name}
      </Typography>
      <Box
        mt={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "auto",
          maxWidth: "100%",
          maxHeight: "650px",
        }}
      >
        <img src={img_Base64} width={"450px"} alt="loading" />
      </Box>
      <Box
        mt={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography variant="body1" color="initial" mr={3}>
          Serves:
        </Typography>
        <Button onClick={() => setPerson(1)} variant="outlined" color="primary">
          1x
        </Button>
        <Button onClick={() => setPerson(2)} variant="outlined" color="primary">
          2x
        </Button>
        <Button onClick={() => setPerson(3)} variant="outlined" color="primary">
          3x
        </Button>
      </Box>
      <TabContext value={value}>
        <Box sx={{ ml: 2, borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Ingrediants" value="1" />
            <Tab label="Method" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom component="div">
              Ingredients
            </Typography>
            <ul>
              {ingredients?.map((ingredient, index) => (
                <li key={index}>{`${ingredient?.quantity * person} ${
                  ingredient?.unit
                } ${ingredient?.name} ${ingredient?.extraNote}`}</li>
              ))}
            </ul>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Typography variant="body1" color="initial">
            {description}
          </Typography>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default ViewRecipeDetails;
