import React, { useEffect, useState } from "react";
import "./statistics.css";
import { useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { FaUserGroup } from "react-icons/fa6";
import BarChart from "../chart/BarChart";
import { BsCartCheck, BsCartCheckFill } from "react-icons/bs";
import { TfiStatsUp } from "react-icons/tfi";

const Statistics = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        setUsers(result);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchOrdersData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        setOrders(result);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchUsersData();
      fetchOrdersData();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);
// Pretul total al comenzii
  const totalSum = orders.reduce(
    (accumulator, order) => accumulator + order.totalPrice,
    0
  );
  return (
    <div>
      <div className="statistics-container">
        <div className="statistics-element">
          <div className="statistics-group">
            <span>
              <h3>{users.length}</h3>
              <p>Users</p>
            </span>
            <FaUserGroup />
          </div>
          <button className="statistics-button">All users</button>
        </div>

        <div className="statistics-element">
          <div className="statistics-group">
            <span>
              <h3>{orders.length}</h3>
              <p>Orders</p>
            </span>
            <BsCartCheckFill className="" />
          </div>
          <button className="statistics-button">All orders</button>
        </div>
        <div className="statistics-element">
          <div className="statistics-group">
            <span>
              <h3>${totalSum}</h3>
              <p>All earnings</p>
            </span>
            <TfiStatsUp />
          </div>
          <button className="statistics-button">All statistics</button>
        </div>
      </div>
     
    </div>
  );
};

export default Statistics;
