import React, { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import cartImage from "../../images/shopping-cart-outline-svgrepo-com.svg";
import logoImage from "../../images/logo2.png";
import { HiUserCircle } from "react-icons/hi";
import { CartContext } from "../../context/cartContext"; // Import contextul

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { getTotalItems } = useContext(CartContext); // Folosește contextul pentru a obține numărul de produse din coș

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
            <Link to="/cart" className="nav-link">
              <div className="cart-icon-wrapper">
                <img src={cartImage} alt="Cart" className="cart-icon" />
                {getTotalItems() > 0 && (
                  <span className="cart-count">{getTotalItems()}</span>
                )}
              </div>
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
              <div className="cart-icon-wrapper">
                <img src={cartImage} alt="Cart" className="cart-icon" />
                {getTotalItems() > 0 && (
                  <span className="cart-count">{getTotalItems()}</span>
                )}
              </div>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
