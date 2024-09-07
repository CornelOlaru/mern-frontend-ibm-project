import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { CartContext } from '../../context/cartContext';
import OrderForm from '../../components/orderForm/OrderForm'; // Import the new component
import { jwtDecode } from 'jwt-decode';
import './cart.css';

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();



  if (cart.length === 0) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="navbar-spacing"></div>
        <div className="content-wrapper empty-cart">
          <h2>My cart</h2>
          <p>Cart is empty</p>
          <button onClick={() => navigate('/')}>Continue Browsing</button>
        </div>
        <div className="footer-spacing"></div>
        <Footer />
      </div>
    );
  }
  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };
  
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };
  
  if (cart.length === 0) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="navbar-spacing"></div>
        <div className="content-wrapper empty-cart">
          <h2>My cart</h2>
          <p>Cart is empty</p>
          <button onClick={() => navigate('/')}>Continue Browsing</button>
        </div>
        <div className="footer-spacing"></div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="page-container">
      <Navbar />
      <div className="navbar-spacing"></div>
      <div className="content-wrapper">
        <div className="cart-container">
          <h2>My cart</h2>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.imageUrl.url} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, 1)}>+</button>
              </div>
              <p>${item.price * item.quantity}</p>
              <button className="remove-button" onClick={() => removeFromCart(item._id)}>
                <img src="/src/images/delete-icon.png" alt="Remove" />
              </button>
            </div>
          ))}
          <div className="order-summary">
            <h3>Order summary</h3>
            <p>
              Subtotal: $
              {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </p>
            <p>Delivery: FREE</p>
            <p>
              Total: $
              {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </p>
          </div>

          {/* Render the OrderForm component */}
          <OrderForm cart={cart}  setCart={setCart}  />
        </div>
      </div>
      <div className="footer-spacing"></div>
      <Footer />
    </div>
  );
};

export default Cart;

