import "./sidebar.css";
import { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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

function Sidebars() {
  //const { collapseSidebar } = useProSidebar();
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
              <MenuItem
                // icon={<FiChevronsRight />}
                onClick={handleCollapsedChange}
              ></MenuItem>
            ) : (
              <MenuItem
                // suffix={<FiChevronsLeft />}
                onClick={handleCollapsedChange}
              >
                <div
                  style={{
                    padding: "9px",
                    // textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: 14,
                    letterSpacing: "1px",
                  }}
                >
                  YOUR LOGO!..
                </div>
              </MenuItem>
            )}
            <hr />
          </Menu>

          <Menu>
            <MenuItem icon={<MenuBookIcon />}>
              <Link to="/dashboard">Dashboard</Link>
            </MenuItem>
            <SubMenu defaultOpen label={"Category"} icon={""}>
              <MenuItem icon={""}>
                <Link to="category">All Category</Link>
              </MenuItem>
              <MenuItem icon={""}>
                <Link to="add_category">Add Category</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu defaultOpen label={"Recipe"} icon={""}>
              <MenuItem icon={""}>
                <Link to="recipe">All Recipe</Link>
              </MenuItem>
              <MenuItem icon={""}>
                <Link to="add_recipe">Add Recipe</Link>
              </MenuItem>
            </SubMenu>
            <MenuItem>
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
