import "./sidebar.css";
import  { useState } from "react";
import MenuBookIcon from '@mui/icons-material/MenuBook';
// import {
//   RiHome4Line,
//   RiTeamLine,
//   RiCalendar2Line,
//   RiFolder2Line,
//   RiUserFollowLine,
//   RiPlantLine,
//   RiStackLine,
//   RiUserUnfollowLine
// } from "react-icons/ri";
// import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi/";
import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem
  //useProSidebar
} from "react-pro-sidebar";

function Sidebars() {
  //const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);

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
                    letterSpacing: "1px"
                  }}
                >
                  YOUR LOGO!..
                </div>
              </MenuItem>
            )}
            <hr />
          </Menu>

          <Menu>
            <MenuItem icon={<MenuBookIcon/>}>Dashboard</MenuItem>
            <SubMenu defaultOpen label={"Professors"} icon={''}>
              <MenuItem icon={''}>Active </MenuItem>
              <MenuItem icon={''}>Ex Professors</MenuItem>
              <MenuItem icon={''}>Probation Period</MenuItem>
            </SubMenu>
            <SubMenu defaultOpen label={"Records"} icon={''}>
              <MenuItem icon={''}>Senior Students</MenuItem>
              <MenuItem icon={''}>Junior Students</MenuItem>
            </SubMenu>
          </Menu>
        </main>
      </Sidebar>
    </div>
  );
}
export default Sidebars;
