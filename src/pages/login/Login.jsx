import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FaInfoCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
      localStorage.setItem("token", result.token);
      if (!result.token) {
        localStorage.clear("token", result.token);
        navigate("/");
      }
      localStorage.getItem("token", result.token);
      const decoded = jwtDecode(result.token);
      console.log(decoded);
      console.log(result);
      if (!result.token) {
      }
      if (decoded.role == "admin" && response.ok) {
        navigate("/admin");
      } else if (decoded.role == "distributor" && response.ok) {
        navigate("/distributor");
      } else if (decoded.role == "customer" && response.ok) {
        navigate("/");
        return result;
      } else {
        setErrorMessage(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
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
              <div className="form-input">
                <input
                  className=""
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
            <button className="form-button" type="submit">
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
