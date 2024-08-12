import React, { useEffect, useState } from 'react';
import './orders.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdDeleteForever, MdOutlineOpenInNew } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setOrders(result); // Set the fetched orders to state
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchOrdersData();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const deleteOrder = async (e, _id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;

    const confirmDelete = confirm(`Are you sure you want to delete product with ID ${_id}?`);
    if (!confirmDelete) {
      return;
    }

    thisClicked.innerText = "Deleting...";

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Redirecting to login.");
        navigate("/login");
        return;
      }

      const deleteResponse = await fetch(`http://localhost:3001/api/orders/${_id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!deleteResponse.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Product deleted successfully.");

      const response = await fetch("http://localhost:3001/api/orders", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response received:", data);

    

        setOrders(data);
      
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
    }

    thisClicked.innerText = "Delete";
  }

  return (
    <div className="orders-container">
      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Total Order Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order?.totalPrice}</td>
                <td>{new Date(order?.orderDate).toLocaleString()}</td>
                <td>{order?.status}</td>
                <td>
                  <Link to={`/orders/${order._id}`} className="action-icon">
                    <MdOutlineOpenInNew title="View" />
                  </Link>
                  <Link className="action-icon">
                    <FaRegEdit title="Edit" />
                  </Link>
                  <button onClick={(e) => deleteOrder(e, order._id)} className="action-icon">
                    <MdDeleteForever title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default Orders;
