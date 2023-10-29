import * as Yup from "yup";

const recipeSchema = Yup.object({
  name: Yup.string()
    .required("Please Enter Category Name")
    .min(2, "Category Name Must Be At Least 2 Characters")
    .matches(
      /^[a-zA-Z\s][a-zA-Z0-9\s]*$/,
      "Category Name Must Start With a Letter"
    ),
  description: Yup.string().required("Please Enter Description"),
  cookingTime: Yup.string()
    .required("Please Enter Sub Heading")
    .min(2, "Sub Heading Must Be At Least 2 Characters")
    .matches(
      /^[a-zA-Z\s][a-zA-Z0-9\s]*$/,
      "Sub Heading Must Start With a Letter"
    ),

  ingredients: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("Please Enter Ingrediant Name")
        .min(2, "Ingrediant Name Must Be At Least 2 Characters")
        .matches(
          /^[a-zA-Z\s][a-zA-Z0-9\s]*$/,
          "Ingrediant Name Must Start With a Letter"
        ),
      quantity: Yup.string().required("Please enter Quantity"),
      unit: Yup.string().required("Please enter Unit"),
    })
  ),
  img_Base64: Yup.mixed().required("Please Enter Image"),
});

export default recipeSchema;
