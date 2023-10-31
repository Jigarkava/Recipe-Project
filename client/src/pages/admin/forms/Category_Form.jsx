/* eslint-disable react/prop-types */
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import categorySchema from "../../../schemas/categorySchema";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategoryDataById,
  updateCategoryData,
} from "../../../store/slices/categorySlice";
import { useEffect } from "react";
import slugify from "slugify";

const Category_Form = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getDataByID, status } = useSelector((state) => state?.category);

  useEffect(() => {
    if (id) {
      dispatch(getCategoryDataById(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "all",
    values: id ? getDataByID?.category : {},
    // ! pre fill form
    resolver: yupResolver(categorySchema),
  });

  const img_Base64 = watch("img_Base64");

  const onDrop = (acceptedFiles) => {
    let selectedFile = acceptedFiles[0];

    // base64
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setValue("img_Base64", reader.result);
      trigger("img_Base64");
    };
    console.log(selectedFile);
    trigger("img_Base64");
  };

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const removeImage = () => {
    setValue("img_Base64", null);
    trigger("img_Base64");
  };

  const onCategoryNameChange = (e) => {
    const newName = e.target.value;
    const newSlug = slugify(newName, { lower: true });
    setValue("slug", newSlug);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (id) {
      dispatch(
        updateCategoryData({
          data: data,
          _id: id,
        })
      ).then(() => {
        navigate("/dashboard/category");
      });
    } else {
      console.log(data);
      dispatch(createCategory(data)).then(() => {
        reset();
        navigate("/dashboard/category");
      });
    }
  };

  if (status) {
    return <p>Loading......</p>;
  }

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid p={3} container spacing={2}>
          <Grid item sm={12}>
            <Typography variant="h4" textAlign={"center"} color={"purple"}>
              {id ? "Edit" : "Add"} Category
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Category Name"
              {...register("name")}
              onChange={onCategoryNameChange}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              {...register("slug")}
              error={!!errors.slug}
              helperText={errors.slug?.message}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Sub Heading"
              {...register("subName")}
              error={!!errors.subName}
              helperText={errors.subName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              rows={3}
              multiline
              fullWidth
              label="Description"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Grid>

          <Grid item sm={12}>
            {!img_Base64 && (
              <>
                <label>Upload Image:</label>
                <Box
                  sx={{
                    mt: 2,
                    border: "1px dashed",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "border-color 0.3s ease",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Typography variant="body1">
                    Drag and drop some Images here, or click to select Images
                  </Typography>
                </Box>
              </>
            )}

            {errors.img_Base64 ? (
              <FormHelperText error>
                {errors.img_Base64?.message}
              </FormHelperText>
            ) : null}
          </Grid>

          <Grid item sm={10} border={0}>
            {img_Base64 && (
              <>
                <Typography variant="body1" color="initial">
                  Uploded Image
                </Typography>
                <Box
                  sx={{
                    p: "3px",
                  }}
                >
                  <img width={"250px"} src={img_Base64} alt="Preview" />
                  <Typography mt={1} mb={1} variant="body2" color="initial">
                    {img_Base64.name}
                  </Typography>
                  <Button
                    mt={"10px"}
                    color="error"
                    variant="outlined"
                    onClick={removeImage}
                  >
                    Delete
                  </Button>
                </Box>
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              sx={{ pl: 3, pr: 3 }}
              variant="contained"
              color="primary"
            >
              {id !== undefined ? "Update" : "Create Category"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Category_Form;
