import React, { useState } from "react";
import "./login.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {jwtDecode} from "jwt-decode"; // Import without destructuring
import { FaInfoCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // const [token, setToken] = useState("");
  const showPasswordFunction = () => {
    setShowPassword(!showPassword);
  };

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

      if (response.status === 401) {
        setErrorMessage("Unauthorized: Invalid credentials");
        return;
      }
      
      if (!result.token) {
        setErrorMessage("Failed to generate token");
       
        return;
      }

      // Save token to localStorage
      localStorage.setItem("token", result.token)
      const token = localStorage.getItem('token')
console.log("Token:", token)
      // Decode token and redirect based on role
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") {
        navigate("/admin");
      } else if (decoded.role === "distributor") {
        navigate("/distributor");
      } else if (decoded.role === "customer") {
        navigate("/");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }

    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setFormData({
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

            {errorMessage && (
              <p className="error-message">
                <FaInfoCircle style={{ marginRight: "5px" }} />
                {errorMessage}
              </p>
            )}

            <div className="form-row">
              <label className="form-label">Email</label>
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
              <label className="form-label">Password</label>
              <div className="form-input password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "password" : "text"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span className="eye-password" onClick={showPasswordFunction}>
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
            <button className="form-button-login" type="submit">
              Login
            </button>
            <Link className="register-link" to="/register">
              Don't have an account?
            </Link>
          </form>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Login;
