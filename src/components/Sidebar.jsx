// Sidebar.jsx
import { FlaskConical, Handbag, HandCoins, Home, Users, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="position-fixed w-100 h-100 d-lg-none"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-primary text-white position-fixed h-100 p-3 ${
          isOpen ? "d-block" : "d-none"
        } d-lg-block`}
        style={{
          width: "250px",
          zIndex: 1050,
          transition: "transform 0.3s ease",
        }}
      >
        {/* Header with close button for mobile */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <img
              src="./images/logo.png"
              alt="Logo"
              className="img-fluid rounded-circle me-2"
              width={50}
              height={50}
            />
            <span className="fw-bold">Medilab</span>
          </div>
          <button
            onClick={toggle}
            className="btn btn-link text-white p-0 d-lg-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <Link
              to="/dashboard"
              className="nav-link text-white d-flex align-items-center p-2"
            >
              <Home className="me-2" size={18} />
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/nurses"
              className="nav-link text-white d-flex align-items-center p-2"
            >
              <Handbag className="me-2" size={18} />
              Nurses
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/labs"
              className="nav-link text-white d-flex align-items-center p-2"
            >
              <FlaskConical className="me-2" size={18} />
              Labs
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/members"
              className="nav-link text-white d-flex align-items-center p-2"
            >
              <Users className="me-2" size={18} />
              Members
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/bookings"
              className="nav-link text-white d-flex align-items-center p-2"
            >
              <Handbag className="me-2" size={18} />
              Bookings
            </Link>
          </li>
          

          <li className="nav-item">
            <Link
              to="/allocations"
              className="nav-link text-white d-flex align-items-center p-2"
            >
              <HandCoins className="me-2" size={18} />
              Allocations
            </Link>
          </li>
        </ul>

        {/* Footer */}
        <div className="position-absolute bottom-0 start-0 w-100 p-3">
          <div className="d-flex justify-content-between align-items-center">
            <span>Admin</span>
            <button className="btn btn-outline-light btn-sm">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
