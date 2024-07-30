import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchUsers();
      fetchProducts();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <main>
      <Navbar />
      <div className="dashboard-content">
        <section>
          <h2>Users</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Products</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Contact Details</h2>
          <div className="contact-details">
            <p>Email: support@ecommerceapp.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 E-commerce St, Shop City, EC 12345</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
