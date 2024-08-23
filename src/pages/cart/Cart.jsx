import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { CartContext } from '../../context/cartContext';
import './cart.css';

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);
  const [address, setAddress] = useState('');
  const [county, setCounty] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [userId, setUserId] = useState(null); // State to store userId

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken.id)
        setUserId(decodedToken.id); // Adjust according to your token's structure
       
      } catch (error) {
        console.error('Token decoding failed:', error);
      }
    }
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const isCardPayment = paymentMethod === 'card';
    const isCardDetailsFilled = isCardPayment
      ? cardDetails.cardNumber && cardDetails.expiryDate && cardDetails.cvv
      : true;
    const isAddressFilled = address && county && city && phoneNumber;

    setIsFormValid(isCardDetailsFilled && isAddressFilled);
  }, [address, county, city, phoneNumber, paymentMethod, cardDetails]);

  const handleCheckout = () => {
    setCheckout(true);
  };

  const handlePlaceOrder =  () => {
    if (!isFormValid || !userId) return;

    // const orderDetails = {
    //   user: userId.id,
    //   items: cart.map(item => ({
    //     product: item._id,
    //     quantity: item.quantity,
    //     price: item.price,
    //   })),
    //   totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    //   status: 'pending',
    //   orderDate: new Date().toISOString(),
    // };

//  const response =  await fetch('https://mern-backend-ibm-project.vercel.app/api/orders/', {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       },
//       body: JSON.stringify(orderDetails),
//     })
//      const data = await response.json();
//      console.log(data)
     alert("Order Placed Succesfully")
        setCart([]);
        
        setCheckout(false);
        navigate('/');
        

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
            <button onClick={handleCheckout}>Checkout</button>
          </div>
          {checkout && (
            <div className="checkout-form">
              <h3>Checkout</h3>
              <label>
                County:
                <input
                  type="text"
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </label>
              <label>
                Payment Method:
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
              </label>
              {paymentMethod === 'card' && (
                <div className="card-details">
                  <label>
                    Card Number:
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Expiry Date:
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiryDate}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    CVV:
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cvv: e.target.value })
                      }
                    />
                  </label>
                </div>
              )}
              <button
                onClick={handlePlaceOrder}
                disabled={!isFormValid} // Disable button if form is not valid
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="footer-spacing"></div>
      <Footer />
    </div>
  );
};

export default Cart;
