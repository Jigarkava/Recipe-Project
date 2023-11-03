import "./sidebar.css";
import { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";

import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem,
  //useProSidebar
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/slices/authSlice";
import Logo from "../assets/Logo.png";

function Sidebars() {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div>
      <Sidebar
        className={`app ${toggled ? "toggled" : ""}`}
        style={{ height: "100vh", position: "absolute" }}
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      >
        <main>
          <Menu>
            {collapsed ? (
              <MenuItem onClick={handleCollapsedChange}></MenuItem>
            ) : (
              <MenuItem onClick={handleCollapsedChange}>
                <div
                  style={{
                    padding: "9px",
                    fontWeight: "bold",
                    fontSize: 14,
                    letterSpacing: "1px",
                  }}
                >
                  <img src={Logo} height={28} alt="Logo" />
                </div>
              </MenuItem>
            )}
            <hr />
          </Menu>

          <Menu>
            <SubMenu defaultOpen label={"Category"} icon={<CategoryIcon />}>
              <MenuItem>
                <Link to="/dashboard">All Category</Link>
              </MenuItem>
              <MenuItem>
                <Link to="add_category">Add Category</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu defaultOpen label={"Recipe"} icon={<MenuBookIcon />}>
              <MenuItem>
                <Link to="recipe">All Recipe</Link>
              </MenuItem>
              <MenuItem>
                <Link to="add_recipe">Add Recipe</Link>
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<LogoutIcon />}>
              <Link to="/login" onClick={() => dispatch(setLogout())}>
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </main>
      </Sidebar>
    </div>
  );
}
export default Sidebars;
