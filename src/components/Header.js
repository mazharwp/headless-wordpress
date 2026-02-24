// src/components/Header.js

import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaGift,
  FaInstagram,
  FaMapMarkerAlt,
  FaPinterestP,
  FaSearch,
  FaShoppingCart,
  FaTwitter,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/bootstrap.css";
import "../assets/css/custom_script.css";
import "../assets/css/header.css";
import "../assets/css/icons/fonts/icomoon.svg";
import "../assets/css/template.css";
import logo from "../assets/images/welop.png";

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload(); // header refresh
  };

  return (
    <header>
      {/* Top Bar */}
      <div className="topbar">
        <div className="topbar-left">
          <FaEnvelope className="icon" /> contact@example.com
          <FaMapMarkerAlt
            className="icon"
            style={{ marginLeft: "20px" }}
          />{" "}
          250 Main Street, 2nd Floor, USA
        </div>

        <div className="topbar-right">
          <FaFacebookF className="social-icon" />
          <FaTwitter className="social-icon" />
          <FaInstagram className="social-icon" />
          <FaPinterestP className="social-icon" />
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="header-right">
          <FaSearch className="action-icon" />

          <div className="cart">
            <FaShoppingCart className="action-icon" />
            <span className="cart-count">0</span>
          </div>

          {user ? (
            <>
              <span style={{ marginRight: "15px", fontWeight: "bold" }}>
                Welcome, {user}
              </span>

              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              <FaGift className="gift-icon" /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}