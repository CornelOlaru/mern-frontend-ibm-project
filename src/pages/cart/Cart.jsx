import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import {CartContext} from '../../context/cartContext';
import './cart.css';

const Cart = () => {
  const { cart, setCart } = useContext(CartContext); 
  const [checkout, setCheckout] = useState(false);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCheckout(true);
  };

  const handlePlaceOrder = () => {
    const orderDetails = {
      user: 'userId', // Replace with actual user ID from auth context or state
      items: cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'pending',
      address,
      paymentMethod
    };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails),
    }).then(res => res.json())
      .then(data => {
        console.log(data.message);
        setCart([]); // Clear the cart
        setCheckout(false);
        navigate('/orders');
      });
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
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.imageUrl.url} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <div className="item-quantity">
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
              <p>${item.price * item.quantity}</p>
            </div>
          ))}
          <div className="order-summary">
            <h3>Order summary</h3>
            <p>Subtotal: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
            <p>Delivery: FREE</p>
            <p>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
          {checkout && (
            <div className="checkout-form">
              <h3>Checkout</h3>
              <label>
                Address:
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              </label>
              <label>
                Payment Method:
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
              </label>
              <button onClick={handlePlaceOrder}>Place Order</button>
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
//   useEffect(() => {
//     // Fetch cart items from API
//     fetch('/api/cart/userId')
//       .then(res => res.json())
//       .then(data => setCart(data));
//   }, []);

//   const handleCheckout = () => {
//     setCheckout(true);
//   };

//   const handlePlaceOrder = () => {
//     const orderDetails = {
//       user: 'userId', // Fetch from context or state
//       items: cart.map(item => ({
//         product: item.id,
//         quantity: item.quantity,
//         price: item.price
//       })),
//       totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
//       status: 'pending'
//     };
//     fetch('/api/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(orderDetails),
//     }).then(res => res.json())
//       .then(data => {
//         console.log(data.message);
//         // Redirect or show confirmation message
//         setCart([]);
//         setCheckout(false);
//         navigate('/orders');
//       });
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="page-container">
//         <Navbar />
//         <div className="navbar-spacing"></div>
//         <div className="content-wrapper empty-cart">
//           <h2>My cart</h2>
//           <p>Cart is empty</p>
//           <button onClick={() => navigate('/')}>Continue Browsing</button>
//         </div>
//         <div className="footer-spacing"></div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       <Navbar />
//       <div className="navbar-spacing"></div>
//       <div className="content-wrapper">
//         <div className="cart-container">
//           <h2>My cart</h2>
//           {cart.map(item => (
//             <div key={item.id} className="cart-item">
//               <img src={item.image} alt={item.name} />
//               <div>
//                 <h3>{item.name}</h3>
//                 <p>${item.price}</p>
//               </div>
//               <div className="item-quantity">
//                 <button>-</button>
//                 <span>{item.quantity}</span>
//                 <button>+</button>
//               </div>
//               <p>${item.price * item.quantity}</p>
//             </div>
//           ))}
//           <div className="order-summary">
//             <h3>Order summary</h3>
//             <p>Subtotal: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
//             <p>Delivery: FREE</p>
//             <p>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
//             <button onClick={handleCheckout}>Checkout</button>
//           </div>
//           {checkout && (
//             <div className="checkout-form">
//               <h3>Checkout</h3>
//               <label>
//                 Address:
//                 <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//               </label>
//               <label>
//                 Payment Method:
//                 <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//                   <option value="cash">Cash on Delivery</option>
//                   <option value="card">Credit/Debit Card</option>
//                 </select>
//               </label>
//               <button onClick={handlePlaceOrder}>Place Order</button>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="footer-spacing"></div>
//       <Footer />
//     </div>
//   );
// };

// export default Cart;
