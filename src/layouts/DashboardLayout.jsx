import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import React from "react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: window.innerWidth >= 992 ? "250px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Topbar toggle={toggleSidebar} />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
