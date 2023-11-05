import * as Yup from "yup";

const recipeSchema = Yup.object({
  categoryId: Yup.array()
    .of(
      Yup.mixed().test(
        "is-string-or-object",
        "Each element must be a string or an object",
        (value) => {
          return typeof value === "string" || typeof value === "object";
        }
      )
    )
    .min(1, "Please select at least one category")
    .required("Category is required"),
  name: Yup.string()
    .required("Please Enter Recipe Name")
    .min(2, "Recipe Name Must Be At Least 2 Characters")
    .matches(
      /^[a-zA-Z\s][a-zA-Z0-9\s]*$/,
      "Recipe Name Must Start With a Letter"
    ),
  description: Yup.string().required("Please Enter Description"),
  cookingTime: Yup.string()
    .required("Please Enter Cooking Time")
    .min(2, "Cooking Time Must Be At Least 2 Characters"),

  ingredients: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("Please Enter Ingrediant Name")
        .min(2, "Ingrediant Name Must Be At Least 2 Characters")
        .matches(
          /^[a-zA-Z\s][a-zA-Z0-9\s]*$/,
          "Ingrediant Name Must Start With a Letter"
        ),
      quantity: Yup.string()
        .required("Please enter Quantity")
        .matches(/^[0-9]+$/, "Please enter numbers only"),
      unit: Yup.string()
        .required("Please enter Unit")
        .matches(/^[a-zA-Z\s][a-zA-Z0-9\s]*$/, "Unit Must Start With a Letter"),
    })
  ),
  img_Base64: Yup.mixed().required("Please Enter Image"),
});

export default recipeSchema;
