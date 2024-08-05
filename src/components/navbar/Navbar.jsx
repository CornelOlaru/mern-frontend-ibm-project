import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import cartImage from "../../images/shopping-cart-outline-svgrepo-com.svg";
import logoImage from "../../images/logo2.png";
import userIco from "../../images/user-ico.png";
import { HiUserCircle } from "react-icons/hi";
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="nav-logo">
        <img src={logoImage} alt="Logo" className="logo-icon" />
      </Link>
      <nav className="nav-links">
        {token ? (
          <>
            <button className="nav-button" onClick={handleClick}>
              Logout
            </button>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <HiUserCircle className="user-icon" />
            {/* <Link to="/profile" className='nav-link'>Profile</Link> */}
            <Link to="/cart" className="nav-link">
              <img src={cartImage} alt="Cart" className="cart-icon" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Log In
            </Link>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/cart" className="nav-link">
              <img src={cartImage} alt="Cart" className="cart-icon" />
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
