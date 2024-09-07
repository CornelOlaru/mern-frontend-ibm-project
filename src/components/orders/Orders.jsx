import React, { useEffect, useState } from "react";
import "./orders.css";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever, MdOutlineOpenInNew } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { getOrders, softDeleteOrder } from "../../services/apiService";
import Loading from "../loading spinners/Loading";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrdersData = async () => {
      setLoading(true);
      try {
        const response = await getOrders();
        setOrders(response); // Set the fetched orders to state
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrdersData();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);
  if (loading) return <Loading />;


  const deleteOrder = async (e, _id) => {
  e.preventDefault();
  const thisClicked = e.currentTarget;

  const confirmDelete = confirm(
    `Are you sure you want to delete the order with ID ${_id}?`
  );
  if (!confirmDelete) {
    return;
  }

  thisClicked.innerText = "Deleting...";

  try {
     
    if (!token) {
      console.error("Token not found. Redirecting to login.");
      navigate("/login");
      return;
    }

    // Call API to soft delete the order
    const deleteResponse = await softDeleteOrder(_id, token);

    // Ensure deleteResponse is properly checked
    if (deleteResponse && deleteResponse.error) {
      throw new Error(
        `Failed to delete order with ID ${_id}: ${deleteResponse.error}`
      );
    }

    console.log(`Order with ID ${_id} deleted successfully.`);

    // Fetch updated list of orders
    const updatedOrders = await getOrders(token);
    if (updatedOrders && !updatedOrders.error) {
      setOrders(updatedOrders);
    } else {
      throw new Error("Failed to fetch updated orders.");
    }
  } catch (error) {
    console.error("Error deleting the order:", error);
  } finally {
    thisClicked.innerText = "Delete";
  }
};


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
                <td>{order?.totalPrice} $</td>
                <td>{new Date(order?.orderDate).toLocaleString()}</td>
                <td>{order?.status}</td>
                <td>
                  <Link to={`/orders/${order._id}`} className="action-icon">
                    <MdOutlineOpenInNew title="View" />
                  </Link>
                  <Link className="action-icon">
                    <FaRegEdit title="Edit" />
                  </Link>
                  <button
                    onClick={(e) => deleteOrder(e, order._id)}
                    className="action-icon"
                  >
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
