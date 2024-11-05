import React, { useState, useEffect } from 'react';
import { saveOrder } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure you have jwt-decode to handle decoding

const OrderForm = ({ cart, setCart }) => {
  const [checkout, setCheckout] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null); // State to store order details
  const token = localStorage.getItem('token');

  const [userId, setUserId] = useState(null);
  
  const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
const items = cart.map(item => ({
    product: item._id,
    quantity: item.quantity,
    price: item.price,
  }));
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:" ,decodedToken)
        setUserId(decodedToken.id); // Adjust based on token structure
      } catch (error) {
        console.error('Token decoding failed:', error);
      }
    }
  }, [token]);

  useEffect(() => {
    // if (userId && cart.length > 0) {
      const newOrderDetails = {
        user: userId, 
        items: items,
        totalPrice: totalPrice,
        status: 'pending',
        // orderDate: new Date().toISOString(),
      };
  
      setOrderDetails(newOrderDetails);
      console.log("Updated orderDetails:", newOrderDetails); // Log orderDetails to verify
    // }
  }, [userId, cart, totalPrice]);
  // Change userId to user in console log
 // console.log(orderDetails?.user); // Now correctly logging the user property
 

  const handleCheckout = () => {
    setCheckout(true);
  };

  const handlePlaceOrder = async () => {
    if (!orderDetails) {
      console.error('Order details are missing!');
      return;
    }
  
    console.log('Order Details:', orderDetails); // Logs the order details
    console.log('Token:', token); // Logs the token
  
    try {
      
      const response = await fetch('https://mern-backend-ibm-project.vercel.app/api/orders', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token if your API requires authentication
        },
        body: JSON.stringify(orderDetails), // Convert orderDetails to JSON string
      });
  
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  
      const data = await response.json(); // Parse the JSON response
      console.log('Order Response:', data);
      alert('Order Placed Successfully');
      setCart([]); // Clear the cart after placing the order
      setCheckout(false);
      navigate('/'); // Navigate back to home or another page
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    }
    
  };
  

  return (
    <div>
      {checkout ? (
        <div>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      ) : (
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      )}
    </div>
  );
};

export default OrderForm;
