import React, { useEffect, useState,  } from "react";
import "./admin.css";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Aside from "../../components/aside/Aside";
import { jwtDecode } from "jwt-decode";
import Statistics from "../../components/statistics/Statistics";
import MyProfile from "./subpages/MyProfile";
import Users from "../../components/all users/Users";
import Orders from "../../components/orders/Orders";
import Form from "../../components/Form";
import FormModal from "../../components/FormModal";
import { Bar } from "react-chartjs-2";

const Admin = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCreate = async (formData, e) => {
    console.log("Form Data Submitted:", formData);
    // Add logic to handle form submission
    // e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
     
      if (response.ok) {
        alert("Account created succesfully!")
        // navigate("/");
        return result;
      } else {
        setErrorMessage(result.message || "Registration failed. Please try again.");

      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);

    } finally {
    
    handleClose();
    }
  };

  const formFields = [
    { name: "name", label: "User Name", type: "text" },
    { name: "email", label: "User Email", type: "email" },
    { name: "password", label: "User Password", type: "password" },
    { name: "role", label: " User Role", type: "text" },
  ];
  return (
    <main className="admin-container">
    <Navbar />
    <Aside />
    <div className="admin-dashboard">
      <h3  id="general" className="admin-title" >
        General
      </h3>
      <div className="">

      <FormModal 
      show={showModal}
      handleCreate={handleCreate}
      handleClose={handleClose}
      formFields={formFields}
      />
      </div>
      <Statistics/>
      <h3 id="users" className="admin-title" >
        Users
      </h3>
      <button variant="primary" onClick={handleShow}>Create User</button>
      <Users/>
      <h3 id="orders" className="admin-title">
        Orders
      </h3>
      <Orders/>
      
      {/* <MyProfile /> */}
    </div>
  </main>
  );
};

export default Admin;
