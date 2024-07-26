import React, { useEffect, useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

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
      if(response.ok) {
          navigate("/login");
        return result
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
        <Navbar/>
      <form onSubmit={handleSubmit} className="signup-form">
        <h1 className="signup-title">Sign up</h1>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button className="form-button" type="submit">
          Sign up
        </button>
        <Link to="/login">Already have an account?</Link>
      </form>
    </main>
  );
};

export default Signup;
