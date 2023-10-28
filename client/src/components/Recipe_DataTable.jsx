import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import classes from "./table.module.css";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";
import { getRecipeData, deleteRecipeData } from "../store/slices/recipeSlice";

const Recipe_DatTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleView = (id) => {
    navigate(`/dashboard/edit_recipe/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteRecipeData(id)).then((res) => {
      toast.success(res.payload.message);
    });
  };

  const { allRecipeData, isLoading } = useSelector((state) => state?.recipe);

  console.log(allRecipeData);

  useEffect(() => {
    if (searchTerm === "") {
      fetchData(page, limit, searchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchTerm]);

  const fetchData = (currentPage, currentLimit, searchTerms) => {
    const queryParams = {
      pageNumber: currentPage,
      limit: currentLimit,
      searchTerm: searchTerms,
    };
    console.log(queryParams);
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

  const pageCount = Math.ceil(allRecipeData?.count / limit);

  return (
    <div
      style={{
        marginTop: "40px",
        backgroundColor: "#ffffff",
        padding: "18px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          columnGap: "10px",
          marginBottom: "10px",
          marginRight: "10px",
        }}
      >
        <Box ml={3}>
          <Button
            onClick={() => navigate("/dashboard/add_recipe")}
            variant="contained"
            color="primary"
          >
            Add Recipe
          </Button>
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
      </div>
      {allRecipeData?.recipes?.length === 0 ? (
        <p>No search results found</p>
      ) : (
        <table cellSpacing={0}>
          <thead className={classes.tblHeader}>
            <th className={classes.theader}>Category Name</th>
            <th className={classes.theader}>Slug</th>
            <th className={classes.theader}>Sub Heading</th>
            <th className={classes.theader}>Description</th>
            <th className={classes.theader}>Image</th>
            <th className={classes.theader}>View</th>
            <th className={classes.theader}>Delete</th>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6}>
                <hr />
              </td>
            </tr>
            {allRecipeData?.recipes?.map((item) => (
              <tr key={item.id}>
                <td>{isLoading ? <Skeleton /> : item?.name}</td>
                <td>{isLoading ? <Skeleton /> : `  ${item?.slug}`}</td>
                <td>{isLoading ? <Skeleton /> : item?.cookingTime}</td>
                <td>{isLoading ? <Skeleton /> : item?.description}</td>

                <td>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <Button
                      size="small"
                      onClick={() => handleView(item._id)}
                      variant="outlined"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  )}
                </td>
                <td>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(item._id)}
                      variant="outlined"
                      startIcon={<DeleteForeverIcon />}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
    </div>
  );
};

export default Recipe_DatTable;