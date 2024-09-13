import React, { useContext, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../images/logo2.png";
import { HiUserCircle } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import { FaArrowDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import cartImage from "../../images/cart.png";
import { CartContext } from "../../context/cartContext"; // Import contextul

const Navbar = () => {
  const [color, setColor] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { getTotalItems } = useContext(CartContext); // Folosește contextul pentru a obține numărul de produse din coș

  const handleClick = () => {
    localStorage.removeItem("token");
    
    navigate("/");
  };
  let decoded = null;
  if (token) {
    try {
      decoded = jwtDecode(token);
      // console.log(decoded);
    } catch (error) {
      console.error("Invalid Token");
      localStorage.removeItem("token");
    }
  }
  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);
  return (
    <header className={color ? "header header-bg" : "header"}>
      <Link to="/" className="nav-logo">
        <img src={logoImage} alt="Logo" className="logo-icon" />
      </Link>
      <nav className="nav-links">
        {token ? (
          <>
            {/* <button className="nav-button" onClick={handleClick}>
              Logout
            </button>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <HiUserCircle className="user-icon" /> */}

            {decoded.role === "customer" && (
              <>
                <div className="dropdown">
                  <div className="dropbtn user" style={{ marginRight: "40px" }}>
                    <HiUserCircle className="user-icon" />

                    <h3 className="nav-link dropbtn">Hi, {decoded.name}</h3>
                    <IoIosArrowDown style={{ paddingTop: "5px" }} />
                  </div>

                  <div className="dropdown-content">
                    <Link to="/my-profile" className="nav-dropdown-button">
                      My Profile
                    </Link>
                    <button
                      className="nav-dropdown-button"
                      onClick={handleClick}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <Link to="/products" className="nav-link">
                  Products
                </Link>
                <Link to="/about" className="nav-link">
                  About
                </Link>
                <Link to="/contact" className="nav-link">
                  Contact
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
            {decoded.role === "admin" && (
              <>
                <div className="dropdown">
                  <div className="dropbtn user" style={{ marginRight: "40px" }}>
                    <HiUserCircle className="user-icon" />

                    <h3 className="nav-link dropbtn">Hi, {decoded.name}</h3>
                    <IoIosArrowDown style={{ paddingTop: "5px" }} />
                  </div>

                  <div className="dropdown-content">
                    <Link to="/my-profile" className="nav-dropdown-button">
                      My Profile
                    </Link>
                    <Link to="/admin" className="nav-dropdown-button">
                      Dashboard
                    </Link>
                    <button
                      className="nav-dropdown-button"
                      onClick={handleClick}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
            {decoded.role === "distributor" && (
              <>
                <div className="dropdown">
                  <div className="dropbtn user" style={{ marginRight: "40px" }}>
                    <HiUserCircle className="user-icon" />

                    <h3 className="nav-link dropbtn">Hi, {decoded.name}</h3>
                    <IoIosArrowDown style={{ paddingTop: "5px" }} />
                  </div>

                  <div className="dropdown-content">
                    <Link to="/my-profile" className="nav-dropdown-button">
                      My Profile
                    </Link>
                    <Link to="/distributor" className="nav-dropdown-button">
                      Dashboard
                    </Link>
                    <button
                      className="nav-dropdown-button"
                      onClick={handleClick}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Log In
            </Link>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            <Link to="/cart" className="nav-link">
              <div className="cart-icon-wrapper">
                <img src={cartImage} alt="Cart" className="cart-icon" />
                  {getTotalItems() > 0 && (
                    <span className="cart-count">{getTotalItems()}</span>
                  )}
              </div>
              {/* <FiShoppingCart className="cart-icon" /> */}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
