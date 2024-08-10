import React, { useState } from "react";
import "./dropdown.css";
import DropdownButton from "../dropdown button/DropdownButton";
import DropdownContent from "../dropdown content/DropdownContent";
const Dropdown = ({ buttonText, content }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }
  return (
    <div className="dropdown1">
      <DropdownButton dropdownVisible={dropdownVisible} toggle={toggleDropdown}>{buttonText}</DropdownButton>
      <DropdownContent dropdownVisible={dropdownVisible}>{content}</DropdownContent>
    </div>
  );
};

export default Dropdown;
