import * as Yup from 'yup'

const categorySchema = Yup.object({
    name: Yup.string().required('Please Enter Category Name').min(2, "Category Name Must Be At Least 2 Characters").matches(/^[a-zA-Z\s][a-zA-Z0-9\s]*$/, "Category Name Must Start With a Letter"),
    subName: Yup.string().required('Please Enter Sub Heading').min(2, "Sub Heading Must Be At Least 2 Characters").matches(/^[a-zA-Z\s][a-zA-Z0-9\s]*$/, "Sub Heading Must Start With a Letter"),
    description: Yup.string().required('Please Enter Description'),
    img_Base64: Yup.mixed().required('Please Enter Image')
})

export default categorySchema
