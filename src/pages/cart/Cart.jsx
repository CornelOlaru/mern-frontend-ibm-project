import React, { useState, useContext, useEffect } from 'react';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  // Function to check if all required fields are filled
  useEffect(() => {
    const isCardPayment = paymentMethod === 'card';
    const isCardDetailsFilled = isCardPayment
      ? cardDetails.cardNumber && cardDetails.expiryDate && cardDetails.cvv
      : true;
    const isAddressFilled = address && county && city && phoneNumber;

    console.log("Address Filled:", isAddressFilled);
    console.log("Card Payment Selected:", isCardPayment);
    console.log("Card Details Filled:", isCardDetailsFilled);
    
    setIsFormValid(isCardDetailsFilled && isAddressFilled);
  }, [address, county, city, phoneNumber, paymentMethod, cardDetails]);

  const handleCheckout = () => {
    setCheckout(true);
  };

  const handlePlaceOrder = () => {
    if (!isFormValid) return;

    const orderDetails = {
      user: 'userId', // trebuie luat din auth context or state
      items: cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'pending',
      address,
      county,
      city,
      phoneNumber,
      paymentMethod,
      cardDetails: paymentMethod === 'card' ? cardDetails : null
    };

    fetch('http://localhost:3001/api/orders/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        alert('Order placed!'); // Show notification
        setCart([]); 
        setCheckout(false);
        navigate('/orders');
      });
  };

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
