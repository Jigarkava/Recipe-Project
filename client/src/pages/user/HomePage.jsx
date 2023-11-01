import {
  Container,
  Grid,
  Pagination,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Autocomplete,
} from "@mui/material";
import RecipeCard from "../../components/RecipeCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeData } from "../../store/slices/recipeSlice";
import classes from "../../components/table.module.css";
import { useNavigate } from "react-router-dom";
import { getCategoryData } from "../../store/slices/categorySlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { recipes, count } = useSelector(
    (state) => state?.recipe?.allRecipeData
  );
  console.log(recipes);
  console.log(count);
  // console.log(count[0].count);

  useEffect(() => {
    if (searchTerm === "") {
      fetchData(page, limit, searchTerm, categoryId);
    }
    dispatch(getCategoryData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchTerm, categoryId]);

  const allCategoryData = useSelector(
    (state) => state?.category?.allCategoryData
  );

  console.log("allCategoryData", allCategoryData);

  const fetchData = (currentPage, currentLimit, searchTerms, categoryId) => {
    const queryParams = {
      pageNumber: currentPage,
      limit: currentLimit,
      searchTerm: searchTerms,
      categoryId: categoryId,
    };
    dispatch(getRecipeData(queryParams));
  };

  const handlePageChange = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    const newLimit = event.target.value;
    setLimit(newLimit);
  };
  const handleSearch = () => {
    fetchData(page, limit, searchTerm);
  };

  const handleView = (slug) => {
    navigate(`/recipe/${slug}`);
  };

  const pageCount = Math.ceil(
    count !== undefined ? count[0]?.count / limit : 1
  );

  // const [categoryValue, setCategoryValue] = useState([]);

  // console.log(categoryValue);

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-between",
          pr: 12,
          pt: 3,
          pb: 3,
        }}
      >
        <Box ml={12} width={"20%"}>
          {allCategoryData?.categories ? (
            <Autocomplete
              multiple
              options={allCategoryData?.categories}
              getOptionLabel={(option) => option?.name}
              onChange={(e, values) => {
                const allSelectedId = values.map((v) => v._id).join(", ");
                setCategoryId(allSelectedId);
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  placeholder="Select Categories"
                />
              )}
            />
          ) : null}
        </Box>
        <Box>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            sx={{ ml: 3 }}
            variant="contained"
            color="secondary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Box>

      <Container>
        {recipes?.length > 0 ? (
          <Grid container spacing={3}>
            {recipes.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card._id}>
                <RecipeCard
                  image={card.img_Base64}
                  recipeName={card.name}
                  handleClick={() => handleView(card.slug)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>No results found</p>
        )}
      </Container>
      <div className={classes.tblPage}>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        <label className={classes.pageLabel}>Rows per page: </label>
        <Select onChange={handleLimitChange} value={limit}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </div>
    </>
  );
};

export default HomePage;
