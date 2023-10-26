import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import {HomePage,Login} from '../pages/'

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />} >
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
