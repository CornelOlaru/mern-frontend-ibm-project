import React, { useRef } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  const emailRef = useRef(null);

 
  const submitHandler = (e) => {
    e.preventDefault(); // Prevents default form submission
    const email = emailRef.current.value;
    
    if (email) {
        alert(`Subscribed to Aromia's weekly report with email: ${email}`);
        emailRef.current.value = ""; // Clear the input field
    } else {
        alert("Please enter a valid email address.");
    }
}

  return (
    <main className="footer-container">
      {/* <Footer className='footer'> */}
      <div className="footer-grid">
        <div className="footer-aromia">
          <h3 className="footer-title">Aromia</h3>
          <ul className="footer-links">
            <Link to="/products">Shop all</Link>
            <Link>For Body</Link>
            <Link>For Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </ul>
        </div>
        <div className="footer-help">
          <h3 className="footer-title">Help</h3>
          <ul className="footer-links">
            <Link to="/help#store-policy">Store policy</Link>
            <Link id="payment-methods" to="/help#payment-methods">
              Payment methods
            </Link>
            <Link to="/help#faq">FAQ</Link>
          </ul>
        </div>
        <div className="footer-contact">
          <h3 className="footer-title">Contact</h3>
          <ul className="footer-list">
            <li>123-456-7890</li>
            <li>aromia@aromia.ro</li>
          </ul>
        </div>
        <form className="footer-subscribe" onSubmit={submitHandler}>
          <h3 className="footer-title">Newsletter</h3>
          <label>Enter Email*</label>
          <input
            className="footer-input"
            type="email"
            name="email"
            id="subscribe-email"
            placeholder="Email"
            ref={emailRef}
            required
          />
          <button onClick={submitHandler} className="footer-button" type="submit">
            SUBSCRIBE
          </button>
        </form>
      </div>
      {/* </Footer> */}
    </main>
  );
};

export default Footer;
