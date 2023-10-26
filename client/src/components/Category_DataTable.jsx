import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import classes from "./table.module.css";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getCategoryData } from "../store/slices/categorySlice";

const Category_DatTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleView = (id) => {
    navigate(`edit_category/${id}`);
  };

  const { allCategoryData, isLoading } = useSelector(
    (state) => state?.category
  );
  console.log(allCategoryData.categories.length);

  const renderItems = () => {
    const startIndex = (page - 1) * limit;
    console.log(startIndex);
    const endIndex = startIndex + limit;
    console.log(endIndex);
    return allCategoryData?.categories?.slice(startIndex, endIndex);
  };

  const finalData = renderItems();

  console.log(renderItems());

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
    dispatch(getCategoryData(queryParams));
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

  const pageCount = Math.ceil(allCategoryData?.count / limit);

  return (
    <div
      style={{
        marginTop: "90px",
        backgroundColor: "#ffffff",
        padding: "18px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          columnGap: "10px",
          marginBottom: "10px",
          marginRight: "10px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {allCategoryData?.categories?.length === 0 ? (
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
            {finalData?.map((item) => (
              <tr key={item.id}>
                <td>{isLoading ? <Skeleton /> : item?.name}</td>
                <td>{isLoading ? <Skeleton /> : `  ${item?.slug}`}</td>
                <td>{isLoading ? <Skeleton /> : item?.subName}</td>
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
                      onClick={() => handleView(item)}
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

export default Category_DatTable;
