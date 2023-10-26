import { Routes, Route } from "react-router-dom";
import { Category, Recipe, Dashboard } from "../pages";
import AdminLayout from "../layout/AdminLayout";
import Category_Form from "../pages/admin/forms/Category_Form";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="category" element={<Category />} />
        <Route path="add_category" element={<Category_Form />} />
        <Route path="edit_category/:id" element={<Category_Form />} />
        <Route path="recipe" element={<Recipe />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
