/* eslint-disable react/prop-types */
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormHelperText,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import recipeSchema from "../../../schemas/recipeSchema";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import slugify from "slugify";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  createRecipe,
  getRecipeById,
  updateRecipeData,
} from "../../../store/slices/recipeSlice";
import { toast } from "react-toastify";
import { getCategoryData } from "../../../store/slices/categorySlice";

const Category_Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allRecipeData, recipeDataById, status } = useSelector(
    (state) => state?.recipe
  );
  const [initValueState, setInitialValue] = useState([]);
  console.log("initValueState", initValueState);

  console.log("allrecipedata", allRecipeData);
  console.log("recipeDataById", recipeDataById);

  useEffect(() => {
    dispatch(getCategoryData());
    if (id) {
      dispatch(getRecipeById(id)).catch((err) => toast.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const allCategoryData = useSelector(
    (state) => state?.category?.allCategoryData
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    // ! pre fill form

    values:
      id !== undefined
        ? {
            ...recipeDataById?.recipe,
            categoryId:
              recipeDataById?.recipe?.categoryId?.map((val) => val._id) ?? [],
          }
        : {
            name: "",
            slug: "",
            description: "",
            cookingTime: "",
            additionalNotes: "",
            ingredients: [{ name: "", quantity: "", unit: "", extraNote: "" }],
            categoryId: [],
          },
    resolver: yupResolver(recipeSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  useEffect(() => {
    setValue(
      "categoryId",
      initValueState?.map((v) => v?._id)
    );
  }, [initValueState]);

  useEffect(() => {
    if (!id) {
      setInitialValue([]);
      return;
    }
    setInitialValue(recipeDataById?.recipe?.categoryId);

    trigger("categoryId");
  }, [id, recipeDataById]);

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
    setValue("name", newName);
    setValue("slug", newSlug);
    trigger("name");
  };

  const onSubmit = (data) => {
    console.log("data", data);
    if (id) {
      dispatch(
        updateRecipeData({
          data: data,
          _id: id,
        })
      )
        .unwrap()
        .then(() => {
          reset();
          toast.success("Recipe Updated Successfully");
          navigate("/dashboard/recipe");
        })
        .catch((err) => toast.error(err.message));
    } else {
      dispatch(createRecipe(data))
        .unwrap()
        .then(() => {
          reset();
          toast.success("Recipe Created Successfully");
          navigate("/dashboard/recipe");
        })
        .catch((err) => toast.error(err.message));
    }
  };

  if (status) {
    return <p>Loading......</p>;
  }
  console.log("111111", !id ? [] : recipeDataById?.recipe?.categoryId);

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid p={3} container spacing={2}>
          <Grid item sm={12}>
            <Typography variant="h4" textAlign={"center"} color={"purple"}>
              {id ? "Edit" : "Add"} Recipe
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Autocomplete
              multiple
              options={allCategoryData ?? []}
              autoSelect={true}
              getOptionLabel={(option) => option?.name}
              value={initValueState ?? []}
              onChange={(e, values) => {
                setInitialValue(values);
                trigger("categoryId");
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  placeholder="Select Categories"
                  error={!!errors.categoryId}
                  helperText={errors.categoryId?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Recipe Name"
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
              rows={3}
              multiline
              fullWidth
              label="Description"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Cooking Time"
              {...register("cookingTime")}
              error={!!errors.cookingTime}
              helperText={errors.cookingTime?.message}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Additional Note"
              {...register("additionalNotes")}
              error={!!errors.additionalNotes}
              helperText={errors.additionalNotes?.message}
            />
          </Grid>

          {fields.map((field, index) => (
            <>
              <Grid item sm={2.5}>
                <TextField
                  label="Quantity"
                  fullWidth
                  key={field.id}
                  {...register(`ingredients.${index}.quantity`)}
                  error={!!errors.ingredients?.[index]?.quantity}
                  helperText={errors.ingredients?.[index]?.quantity?.message}
                />
              </Grid>

              <Grid item sm={2.5}>
                <TextField
                  label="Unit"
                  fullWidth
                  key={field.id}
                  {...register(`ingredients.${index}.unit`)}
                  error={!!errors.ingredients?.[index]?.unit}
                  helperText={errors.ingredients?.[index]?.unit?.message}
                />
              </Grid>

              <Grid item sm={3}>
                <TextField
                  fullWidth
                  label="Ingrediant Name"
                  key={field.id}
                  {...register(`ingredients.${index}.name`)}
                  error={!!errors.ingredients?.[index]?.name}
                  helperText={errors.ingredients?.[index]?.name?.message}
                />
              </Grid>

              <Grid item sm={3}>
                <TextField
                  label="Extra Note"
                  fullWidth
                  key={field.id}
                  {...register(`ingredients.${index}.extraNote`)}
                />
              </Grid>

              {index <= 0 && (
                <Grid item sm={1}>
                  <IconButton
                    fullWidth
                    color="success"
                    onClick={() =>
                      append({
                        name: "",
                        quantity: "",
                        unit: "",
                        extraNote: "",
                      })
                    }
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Grid>
              )}
              {index > 0 && (
                <Grid item sm={1}>
                  <IconButton onClick={() => remove(index)} color="error">
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Grid>
              )}
            </>
          ))}

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
