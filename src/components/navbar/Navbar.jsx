import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../images/logo2.png";
import userIco from "../../images/user-ico.png";
import { HiUserCircle } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";



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
            <HiUserCircle className="user-icon" />
            <button className="nav-button" onClick={handleClick}>
              Logout
            </button>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/about" className='nav-link'>About</Link>
             <Link to="/cart" className="nav-link">
              
            <FiShoppingCart className="cart-icon"/>
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
            <Link to="/about" className='nav-link'>About</Link>
            <Link to="/contact" className='nav-link'>Contact</Link>
            <Link to="/cart" className="nav-link">
            <FiShoppingCart className="cart-icon"/>
             
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
