import React, { useContext, useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../images/logo2.png";
import { HiUserCircle } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import {
  FaArrowDown,
  FaArrowUp,
  FaBars,
  FaRegUser,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import cartImage from "../../images/cart.png";
import { CartContext } from "../../context/cartContext"; // Import contextul
import { IconContext } from "react-icons";
import Dropdown from "../dropdown/dropdown/Dropdown";
import DropdownItem from "../dropdown/dropdown item/DropdownItem";
import { MdFavoriteBorder } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FavoriteContext } from "../../context/favoriteContext";

const Navbar = () => {
  const [color, setColor] = useState(false);
  const [click, setClick] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownContentRef = useRef(null);
  const sideMenuRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownContentRef.current &&
        !dropdownContentRef.current.contains(e.target) &&
        isDropdownOpen
      ) {
        setIsDropdownOpen(false);
      }
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(e.target) &&
        click
      ) {
        setClick(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [click, isDropdownOpen]);

  const hamburgerClick = () => {
    setClick(!click); // Toggle the click state

    // Disable or enable scroll based on the click state
    if (!click) {
      document.body.classList.add = "no-scroll"; // Disable scrolling
    } else {
      document.body.classList.remove = "no-scroll"; // Enable scrolling
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown on click
  };
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { getTotalItems } = useContext(CartContext); // Folosește contextul pentru a obține numărul de produse din coș
  const {getTotalFavoriteItems} = useContext(FavoriteContext);
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
  useEffect(() => {
    const handleScroll = () => setColor(window.scrollY >= 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={color ? "header header-bg" : "header"}>
        <>
          {token ? (
            <>
              {decoded.role === "customer" && (
                <>
                  <div className="header-container">
                    <div
                      className={
                        click ? "hamburgerMenu active" : "hamburgerMenu"
                      }
                      onClick={hamburgerClick}
                    >
                      {click ? (
                        <FaTimes style={{ color: "#fff" }} />
                      ) : (
                        <FaBars style={{ color: "#fff" }} />
                      )}
                    </div>

                    <Link to="/" className="nav-logo">
                      <h1 className="nav-logo">Aromia</h1>
                    </Link>
                  </div>
                  <div className="nav-right-corner">
                    <div ref={dropdownContentRef} className="dropdown">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={toggleDropdown}
                        className="user-dropbtn"
                        aria-expanded={isDropdownOpen}
                      >
                        <IconContext.Provider
                          value={{ size: "", className: "" }}
                        >
                          <FaUser className="user-icon" />
                        </IconContext.Provider>
                      </div>

                      <div
                        className={`dropdown-content ${
                          isDropdownOpen ? "show" : "hide"
                        }`}
                      >
                        <h3 className="nav-logo">
                          Hi, {decoded.name}
                        </h3>
                        <hr />
                        <div className="nav-dropdown-button">
                          <Link to="/my-profile">My Profile</Link>
                        </div>
                        <div className="nav-dropdown-button">
                          <Link to="/" onClick={handleClick}>
                            Logout
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Link to="/favorite" className="favorite-icon">
                      <IconContext.Provider value={{ size: "", className: "" }}>
                        <MdFavoriteBorder />
                      </IconContext.Provider>
                      {/* {getTotalItems() > 0 && ( */}
                        <span className="favorite-count">{getTotalFavoriteItems()}</span>
                       {/* )} */}
                    </Link>
                    <Link to="/cart" className="cart-icon">
                      <IconContext.Provider value={{ size: "", className: "" }}>
                        <FiShoppingCart className="" />
                      </IconContext.Provider>

                      <span className="cart-count">{getTotalItems()}</span>
                    </Link>
                  </div>
                </>
              )}
              {(decoded.role === "admin" || decoded.role === "distributor") && (
                <>
                  <ul className={click ? "nav-links active" : "nav-links"}>
                    <div className="dropdown">
                      <div
                        className="dropbtn user"
                        style={{ marginRight: "40px" }}
                      >
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
                  </ul>
                  <div
                    ref={sideMenuRef}
                    className="hamburgerMenu"
                    onClick={hamburgerClick}
                  >
                    {click ? (
                      <FaTimes size={20} style={{ color: "#fff" }} />
                    ) : (
                      <FaBars size={20} style={{ color: "#fff" }} />
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="header-container">
                <div
                  className={click ? "hamburgerMenu active" : "hamburgerMenu"}
                  onClick={hamburgerClick}
                >
                  {click ? (
                    <FaTimes style={{ color: "#fff" }} />
                  ) : (
                    <FaBars style={{ color: "#fff" }} />
                  )}
                </div>

                <Link to="/" className="nav-logo">
                  <h1 className="nav-logo">Aromia</h1>
                </Link>
              </div>

              <div className="nav-right-corner">
                <div ref={dropdownContentRef} className="dropdown">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={toggleDropdown}
                    className="user-dropbtn"
                    aria-expanded={isDropdownOpen}
                  >
                    <IconContext.Provider value={{ size: "", className: "" }}>
                      <FaRegUser className="user-icon" />
                    </IconContext.Provider>
                  </div>

                  <div
                    className={`dropdown-content ${
                      isDropdownOpen ? "show" : "hide"
                    }`}
                  >
                    <div className="nav-dropdown-button">
                      <Link to="/login">Login</Link>
                    </div>
                    <div className="nav-dropdown-button">
                      <Link to="/register">Create account</Link>
                    </div>
                  </div>
                </div>
                <Link to="/favorite" className="favorite-icon">
                  <IconContext.Provider value={{ size: "", className: "" }}>
                    <MdFavoriteBorder />
                  </IconContext.Provider>
                  {getTotalFavoriteItems() > 0 && (
                    <span className="favorite-count">{getTotalFavoriteItems()}</span>
                   )} 
                </Link>
                <Link to="/cart" className="cart-icon">
                  <IconContext.Provider value={{ size: "", className: "" }}>
                    <FiShoppingCart className="" />
                  </IconContext.Provider>

                  <span className="cart-count">{getTotalItems()}</span>
                </Link>
              </div>
            </>
          )}
        </>
      </header>
      <nav className="navbar">
        <div
          ref={sideMenuRef}
          className={`mobile-side-menu ${click ? "open" : "close"}`}
        >
          <ul className={click ? "nav-links active" : "nav-links"}>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </ul>
        </div>
        <div className="search-container">
          <input
            className="nav-search"
            type="search"
            placeholder="Search..."
            required
          />

          <IoSearch role="button" className="nav-search-icon" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
