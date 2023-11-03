import Header from "../components/Header";
import { Outlet } from "react-router-dom";
const UserLayout = () => {
  return (
    <>
      <Header />
      <h1>hello</h1>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
