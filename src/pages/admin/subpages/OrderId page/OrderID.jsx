import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderID = () => {
  const { orderId } = useParams();
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState(false);
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
    <>
      <h2>Order Details</h2>
      <div>
        <strong>Order ID:</strong> {order._id}
      </div>
      <div>
        <strong>User:</strong> {order.user ? order.user : "N/A"}
      </div>
      <div>
        <strong>Items:</strong>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              <strong>Product:</strong> {item.product}, 
              <strong> Quantity:</strong> {item.quantity}, 
              <strong> Price:</strong> ${item.price}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Total Price:</strong> ${order.totalPrice}
      </div>
      <div>
        <strong>Status:</strong> {order.status}
      </div>
      <div>
        <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
      </div>

      {!form ? (
        <button onClick={handleModifyData}>Modify Status</button>
      ) : (
        <div>
          <label>
            <strong>Status:</strong>
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleModifyData}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default OrderID;
