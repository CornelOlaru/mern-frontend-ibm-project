import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./orderId.css"
const OrderID = () => {
  const { orderId } = useParams();
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: "",
  });

  const handleModifyData = () => {
    setForm(!form);
  };

  useEffect(() => {
    const viewOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/orders/${orderId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        setOrder(data);
        setFormData({ status: data.status });
      } catch (error) {
        console.log("Error fetching order data", error);
      }
    };
    viewOrder();
  }, [orderId, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Order status updated successfully!");
        const updatedOrder = await response.json();
        setOrder(updatedOrder);
        setForm(false);
        navigate("/admin");
      } else {
        const errorResponse = await response.text();
        console.error("Response status:", response.status);
        console.error("Response body:", errorResponse);
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!order) {
    return <div>No order found.</div>;
  }

  return (
    <div className="order-container">
      <h2 className="order-heading">Order Details</h2>
      <div className="order-info">
        <div className="order-detail"><strong>Order ID:</strong> {order._id}</div>
        <div className="order-detail"><strong>User:</strong> {order.user ? order.user : "N/A"}</div>
        <div className="order-detail">
          <strong>Items:</strong>
          <ul className="order-items">
            {order.items.map((item, index) => (
              <li key={index}>
                <strong>Product:</strong> {item.product}, 
                <strong> Quantity:</strong> {item.quantity}, 
                <strong> Price:</strong> ${item.price}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-detail"><strong>Total Price:</strong> ${order.totalPrice}</div>
        <div className="order-detail"><strong>Status:</strong> {order.status}</div>
        <div className="order-detail"><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</div>
      </div>

      {!form ? (
        <button className="btn btn-primary" onClick={handleModifyData}>Modify Status</button>
      ) : (
        <div className="form-container">
          <label className="form-label">
            <strong>Status:</strong>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
          <div className="form-buttons">
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            <button className="btn btn-secondary" onClick={handleModifyData}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default OrderID;
