import { useForm, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Demo = () => {
  const staticData = {
    name: "sdfsdf",
    slug: "sdfsdf",
    description: "sdfdsf",
    cookingTime: "svsvsdsdfdsf",
    additionalNotes: "",
    img_Base64: "",
    ingredients: [
      {
        name: "sdfdsf",
        quantity: "sdfsdf",
        unit: "sdfsdfd",
        extraNote: "sdfsdfdf",
      },
      {
        name: "sdfdsf",
        quantity: "sdfsdf",
        unit: "sdfsdfd",
        extraNote: "sdfsdfdf",
      },
      {
        name: "sdfdsf",
        quantity: "sdfsdf",
        unit: "sdfsdfd",
        extraNote: "sdfsdfdf",
      },
      {
        name: "sdfdsf",
        quantity: "sdfsdf",
        unit: "sdfsdfd",
        extraNote: "sdfsdfdf",
      },
    ],
    steps: [{ step: "", extraNote: "" }],
  };

  const isEdit = false;

  const { register, handleSubmit, control } = useForm({
    defaultValues: isEdit
      ? staticData
      : { ingredients: [{ name: "", quantity: "", unit: "", extraNote: "" }] },
  });
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <>
          <TextField
            label=""
            key={field.id}
            {...register(`ingredients.${index}.name`, { required: true })}
          />

          {index > 0 && (
            <Button
              variant="contained"
              onClick={() => remove(index)}
              color="primary"
            >
              Delete
            </Button>
          )}
        </>
      ))}
      <button type="submit">Submit</button>
      <button
        onClick={() =>
          append({ name: "", quantity: "", unit: "", extraNote: "" })
        }
      >
        Add Item
      </button>
    </form>
  );
};

export default Demo;
