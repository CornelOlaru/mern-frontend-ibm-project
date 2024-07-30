import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const soaps = products.filter(product => product.category === 'Soaps');
  const candles = products.filter(product => product.category === 'Candles');

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
          <h2>Soaps</h2>
          <div className="products-container">
            {soaps.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">Price: {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Candles</h2>
          <div className="products-container">
            {candles.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">Price: {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Contact Details</h2>
          <div className="contact-details">
            <p>Email: support@aromia.ro</p>
            <p>Phone: +40770955987</p>
            <p>Address: Strada Magnoliei, Nr 24</p>
          </div>
        </section>

        {/* <section>
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
            <p>Email: support@aromia.ro</p>
            <p>Phone: +40770955987</p>
            <p>Address: Strada Magnoliei, Nr 24</p>
          </div>
        </section> */}
      </div>
    </main>
  );
};

export default Dashboard;
