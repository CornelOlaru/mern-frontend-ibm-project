import React from "react";
import "./dropdownButton.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const DropdownButton = ({ children, toggle, dropdownVisible }) => {
  return (
    <div
      onClick={toggle}
      className={`dropdown-btn ${dropdownVisible ? "button-open" : null}`}
      style={{ transition: "all .5s ease-in-out" }}
    >
      {children}
      <span className="toggle-icon">
        {dropdownVisible ? (
          <IoIosArrowUp style={{ paddingTop: "5px" }} />
        ) : (
          <IoIosArrowDown style={{ paddingTop: "5px" }} />
        )}
      </span>
    </div>
  );
};

export default DropdownButton;
