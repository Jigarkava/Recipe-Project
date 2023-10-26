import React from "react";
import { Outlet } from "react-router-dom";
import Sidebars from "../components/SideBars";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "250px",
          backgroundColor: "#f0f0f0",
          // padding: "20px",
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
          marginLeft: "250px",
          backgroundColor: "#ffffff",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
