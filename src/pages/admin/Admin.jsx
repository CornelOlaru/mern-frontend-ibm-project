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

const Admin = () => {
 

  return (
    <main className="admin-container">
    <Navbar />
    <Aside />
    <div className="admin-dashboard">
      <h3  id="general" className="admin-title" >
        General
      </h3>
      <Statistics/>
      <h3 id="users" className="admin-title" >
        Users
      </h3>
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
