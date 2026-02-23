// src/components/Header.js
import { FaEnvelope, FaFacebookF, FaGift, FaInstagram, FaMapMarkerAlt, FaPinterestP, FaSearch, FaShoppingCart, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/css/header.css';
import logo from "../assets/images/welop.png";

export default function Header() {
  return (
    <header>
      {/* Top Bar */}
      <div className="topbar">
        <div className="topbar-left">
          <FaEnvelope className="icon" /> contact@example.com
          <FaMapMarkerAlt className="icon" style={{ marginLeft: '20px' }} /> 250 Main Street, 2nd Floor, USA
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
          <img src={logo} alt="Logo" />
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
          <button className="donate-btn">
            <FaGift className="gift-icon" /> Make A Donation
          </button>
        </div>
      </div>
    </header>
  );
}
