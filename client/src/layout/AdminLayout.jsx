import { Navigate, Outlet } from "react-router-dom";
import Sidebars from "../components/SideBars";

const AdminLayout = () => {
  let getToken = localStorage.getItem("token");

  return getToken ? (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "250px",
          backgroundColor: "#f0f0f0",
          marginRight: "20px",
          position: "fixed",
          height: "100%",
        }}
      >
        <Sidebars />
      </div>
      <div
        style={{
          flex: 1,
          marginLeft: "280px",
          backgroundColor: "#ffffff",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default AdminLayout;
