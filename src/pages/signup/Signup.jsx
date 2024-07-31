import React, { useEffect, useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        navigate("/login");
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
    <main>
      <Navbar />
        <div className="signup-container">

      <form onSubmit={handleSubmit} className="signup-form">
        <h1 className="form-title">Sign up</h1>
        <div className="form-row">
          <label className="form-label">Name</label>
          <input
          className="form-input"
            name="name"
            id="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            />
        </div>
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
          Sign up
        </button>
        <Link className="login-link" to="/login">Already have an account?</Link>
      </form>
            </div>
            <Footer/>
    </main>
  );
};

export default Signup;
