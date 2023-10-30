/* eslint-disable react/prop-types */
import { Box, Typography, Button } from "@mui/material";
const RecipeCard = ({ image, recipeName, handleClick }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "300px",
            width: "368px",
          }}
        >
          <img src={image} height={"100%"} width={"100%"} alt="Loading" />
        </Box>
        <Box>
          <Typography variant="body2" color="initial">
            {recipeName}
          </Typography>
        </Box>
        <Box>
          <Button variant="outlined" color="primary" onClick={handleClick}>
            More Details
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RecipeCard;
