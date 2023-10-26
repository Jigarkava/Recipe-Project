import { Navigate, Outlet } from "react-router-dom";
// import Sidebars from "../components/SideBar";

const AdminLayout = () => {
  // eslint-disable-next-line no-unused-vars
  let getToken = localStorage.getItem("token");
  return getToken ? (
    <>
    <div style={{
      display: "flex",
      flexDirection: "row",
    }}>

    {/* <Sidebars/> */}
      <main>
        <Outlet />
      </main>
    </div>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default AdminLayout;
