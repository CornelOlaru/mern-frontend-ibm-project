import React from 'react'
import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
const handleClick = () => {
  localStorage.removeItem("token");
  navigate("/")
}


  return (
    <header className='header'>
        <Link to="/" className='nav-logo'><h1>Aromia</h1></Link>
      <nav className='nav-links'>
        {/* {token ? <button onClick={handleClick}>Logout</button> : 
            <>
            <Link to="/login" className='nav-link'>Login</Link>
            <Link to="/register" className='nav-link'>Sign Up</Link>
            </>
        } */}
      </nav>
    </header>
  )
}

export default Navbar
