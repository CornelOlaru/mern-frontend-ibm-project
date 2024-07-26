import React, { useState } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar';
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
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
          localStorage.setItem("token", result.token)
          console.log(result);
          if(response.ok) {
              navigate("/");
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
      <form className='login-form' onSubmit={handleSubmit}>
        <h1 className='form-title'>Login</h1>
        <label htmlFor="email">Email</label>
        <input id='email' name='email' type="email" placeholder='Email' value={formData.email} onChange={handleInputChange}/>
        <label htmlFor="password">Password</label>
        <input id='password' name='password' type="password" placeholder='Password' value={formData.password} onChange={handleInputChange}/>
        <button className='login-button' type='submit'>Login</button>
        <Link to="/register">Don't have an account?</Link>
      </form>
    </main>
  )
}

export default Login
