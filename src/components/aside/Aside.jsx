import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./aside.css";
import { IoSettingsOutline } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi";
import { TbShoppingCartCheck } from "react-icons/tb";
import { MdQueryStats } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from "../dropdown/dropdown/Dropdown";
import DropdownItem from "../dropdown/dropdown item/DropdownItem";
const Aside = () => {

  const usersRef = useRef(); // Create a ref for the Users component
  const ordersRef = useRef() // Create a ref for the Orders component
 const generalRef = useRef() // Create a ref for the General component
 const [dropdownVisible, setDropdownVisible] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  const scrollToUsers = () => {
    usersRef.current.scrollIntoView({ behavior: "smooth", block:"end" });
  };
  const scrollToGeneral = () => {
    generalRef.current.scrollIntoView({ behavior: "smooth" });
    
  };
  const scrollToOrders = () => {
    ordersRef.current.scrollIntoView({ behavior: "smooth" });
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

  return (
    <aside className="side-component">
      <div className="side-user">
        <HiUserCircle
          className="user-icon"
          style={{ color: "#FFF", fontSize: "4rem" }}
        />
      </div>
      <div className="content">
        <Dropdown
          buttonText={
            <span onClick={toggleDropdown} className="">
              Hi, {decoded.name}
            </span>
          }
          content={
            <>
            <div className="dropdown-elements">

              <DropdownItem>
                <Link to="/my-profile" className="side-dropdown-button">
                  My Profile
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link className="side-dropdown-button" onClick={handleClick}>
                  Logout
                </Link>
              </DropdownItem>
            </div>
            </>
          }
        />
      </div>
      <ul className="side-list">
        <Link  onClick={scrollToGeneral}   to="#general" className="side-list-element" style={{borderTop:"1px solid black"}} >
          <IoSettingsOutline className="admin-icon" />
          General
        </Link>
        <Link  onClick={scrollToUsers} to="#users" className="side-list-element">
          <HiUserCircle className="admin-icon" />
          Users
        </Link>
        <Link  onClick={scrollToOrders} to="#orders" className="side-list-element">
          <TbShoppingCartCheck className="admin-icon" />
          Orders
        </Link>
        <Link to="/admin/stats" className="side-list-element">
          <MdQueryStats className="admin-icon" />
          Statistics
        </Link>
      </ul>
    </aside>
  );
};

export default Aside;
