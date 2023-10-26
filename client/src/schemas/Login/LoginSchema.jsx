import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Email"),
  password: Yup.string().required("Please Enter Password"),
}).required();

export default loginSchema;
