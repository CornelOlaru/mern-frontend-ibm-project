import React from "react";
import "./dropdownItem.css";
const DropdownItem = ({ children, onClick }) => {
  return (
    <div
      className="dropdown-item"
      onClick={onClick}
      style={{ transitionDelay: "250ms" }}
    >
        <li style={{marginLeft:"1.4rem", listStyleType:"none"}}>

      {children}
        </li>
    </div>
  );
};

export default DropdownItem;
