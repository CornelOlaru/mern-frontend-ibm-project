import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './contact.css';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <div className="contact-info">
          <p>If you have questions or special inquiries, you're welcome to contact me or fill out this form</p>
          <h2>AROMIA</h2>
          <p>Tel: 123-456-7890</p>
          <p>Email: aromia@aromia.ro</p>
        </div>
        <div className="contact-form">
          <h1>LET'S TALK</h1>
          <form>
            <div className="form-group">
              <label>Enter Your Name *</label>
              <input type="text" placeholder="Full Name" required />
              <label>Enter Your Email *</label>
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <label>Enter Your Phone</label>
              <input type="tel" placeholder="Phone Number" />
            </div>
            <div className="form-group">
              <label>Enter Your Message *</label>
              <textarea placeholder="Write Your Request" required></textarea>
            </div>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
