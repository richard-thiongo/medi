// Topbar.jsx
import {
  Bell,
  CircleUser,
  Menu,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const Topbar = ({ toggle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Sidebar toggle button on small screens */}
        <button onClick={toggle} className="btn btn-outline-primary d-lg-none">
          <Menu />
        </button>

        {/* Right side content */}
        <div className="ms-auto d-flex align-items-center">
          {/* Search input field on large screens */}
          <div
            className="input-group ms-3 d-none d-lg-flex"
            style={{ width: "300px" }}
          >
            <span className="input-group-text bg-white border-end-0">
              <Search size={18} />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search..."
            />
          </div>

          {/* Notification bell */}
          <Bell className="ms-3" size={20} style={{ cursor: "pointer" }} />

          {/* User dropdown */}
          <div className="dropdown ms-2" ref={dropdownRef}>
            <button
              className="btn btn-link text-decoration-none d-flex align-items-center p-1"
              onClick={toggleDropdown}
              style={{ border: "none" }}
            >
              <CircleUser size={20} className="text-muted" />
              <span className="ms-2 text-dark d-none d-sm-inline">Admin</span>
              <ChevronDown
                size={16}
                className={`ms-1 text-muted transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                style={{ transition: "transform 0.2s ease" }}
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                className="dropdown-menu dropdown-menu-end show position-absolute"
                style={{
                  minWidth: "180px",
                  top: "100%",
                  right: "0",
                  zIndex: 1050,
                }}
              >
                <div className="px-3 py-2 border-bottom">
                  <small className="text-muted">Signed in as</small>
                  {/* A div to show as admin */}
                  <div className="fw-medium">Admin</div>
                </div>

                <button className="dropdown-item d-flex align-items-center py-2">
                  <User size={16} className="me-2" />
                  Profile
                </button>

                <button className="dropdown-item d-flex align-items-center py-2">
                  <Settings size={16} className="me-2" />
                  Settings
                </button>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item d-flex align-items-center py-2 text-danger">
                  <LogOut size={16} className="me-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .rotate-180 {
          transform: rotate(180deg);
        }

        .dropdown-item:hover {
          background-color: #f8f9fa;
        }

        .dropdown-item.text-danger:hover {
          background-color: #f8d7da;
          color: #721c24 !important;
        }
      `}</style>
    </div>
  );
};

export default Topbar;
