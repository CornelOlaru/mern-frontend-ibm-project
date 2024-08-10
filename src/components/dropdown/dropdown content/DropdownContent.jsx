// import React from 'react'
import "./dropdownContent.css";
const DropdownContent = ({ children, dropdownVisible }) => {
  return (
    <div
      className={`dropdown-content1 ${
        dropdownVisible ? "content-open" : "content-close"
      }`}
    >
      {children}
    </div>
  );
};

export default DropdownContent;
