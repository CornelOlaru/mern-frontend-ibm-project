
import React from 'react'
import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import cartImage from '../../images/cart.png';
import logoImage from '../../images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
const handleClick = () => {
  localStorage.removeItem("token");
  navigate("/")
}

  return (
    <header className='header'>
        <Link to="/" className='nav-logo'>
        <img src={logoImage} alt="Logo" className="logo-icon" />
       </Link>
      <nav className='nav-links'>
        {token ? <button onClick={handleClick}>Logout</button> : 
            <>
            <Link to="/login" className='nav-link'>Login</Link>
            <Link to="/register" className='nav-link'>Sign Up</Link>
            <Link to="/products" className='nav-link'>Products</Link>
            <Link to="/profile" className='nav-link'>Profile</Link>
            <Link to="/cart" className='nav-link'>
            <img src={cartImage} alt="Cart" className="cart-icon" /></Link>
            </>
        }
      </nav>
    </header>
  )
}

export default Navbar
