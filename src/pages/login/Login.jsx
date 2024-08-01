import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      localStorage.setItem("token", result.token);
      console.log(result);
      if (response.ok) {
        navigate("/");
        return result;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <>
    <main>
      <Navbar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Login</h1>

          <div className="form-row">
            <label className="form-label">
              Email
              </label>
            <input
              className="form-input"
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
              />
              </div>

          <div className="form-row">
            <label className="form-label" >
              Password
            </label>

            <input
              className="form-input"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              />
          </div>
          <button className="form-button" type="submit">
            Login
          </button>
          <Link className="register-link" to="/register">
            Don't have an account?
          </Link>
        </form>
      </div>
      <Footer/>
    </main>
              </>
  );
};

export default Login;
