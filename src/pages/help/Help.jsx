import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './help.css';
import { useLocation } from 'react-router-dom';

const Help = () => {
    const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]); // Run this effect whenever the hash changes
    return (
        <div>
            <Navbar />
            <div  className="help-container spaced-container">
                <section id="store-policy" className="help-section">
                    <h2 className="section-title">STORE POLICY</h2>
                    <h3>Returns and refunds</h3>
                    <p>At Aromia, we strive to ensure that you are completely satisfied with your purchase. If you receive an incorrect or defective item, we offer a hassle-free return and refund policy:</p>
                    <ul>
                        <li><b>Wrong Order:</b> If you receive an item that is not what you ordered, please contact us within 14 days of receiving your package. We will provide you with a prepaid return label, and once we receive the incorrect item, we will send you the correct item or issue a full refund, including shipping costs.</li>
                        <li><b>Defective Item:</b> If you receive a defective item, please contact us within 14 days of delivery. We will arrange for a replacement or issue a full refund, including shipping costs, after verifying the defect.</li>
                    </ul>
                    <h3>Non-Returnable Items</h3>
                    <p>For hygiene and safety reasons, certain items cannot be returned or exchanged. These include:</p>
                    <ul>
                        <li>Used or opened soaps and candles</li>
                        <li>Custom or personalized orders</li>
                        <li>Items marked as final sale</li>
                    </ul>
                    <h3>Order Cancellations</h3>
                    <p>You may cancel your order within 24 hours of placing it. After this period, we may have already begun processing your order, and cancellation may not be possible. Please contact our customer service team promptly if you need to cancel or make changes to your order.</p>
                </section>

                <section id="payment-methods" className="help-section">
                    <h2 className="section-title">PAYMENT METHODS</h2>
                    <ul>
                        <li>Credit / Debit Cards</li>
                        <li>Offline Payments</li>
                    </ul>
                </section>

                <section id="faq" className="help-section">
                    <h2 className="section-title">FAQ</h2>
                    <h3>1. What ingredients are used in your soaps and candles?</h3>
                    <p>Our soaps and candles are made from high-quality, natural ingredients. Our soaps typically include a blend of oils such as olive oil, coconut oil, and shea butter, as well as essential oils for fragrance. Our candles are made from soy wax or beeswax, with natural cotton wicks and essential oils for fragrance.</p>
                    <h3>2. Do you offer custom or personalized orders?</h3>
                    <p>Yes, we offer custom and personalized orders for special occasions such as weddings, birthdays, and corporate events. Please contact us at aromia@aromia.ro to discuss your needs and preferences.</p>
                    <h3>3. How long will it take to receive my order?</h3>
                    <p>Standard processing time for orders is 1-3 business days. Shipping time varies based on your location but typically ranges from 3-7 business days within the country. You will receive a confirmation email with tracking information once your order has shipped.</p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Help;
