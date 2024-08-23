import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './about.css';
import placeholder1 from "../../images/placeholder1.png"
import placeholder2 from "../../images/placeholder2.jpg"
const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <main className="about-container spaced-container">
        <h1 className="about-title">A STORY OF FRESHNESS</h1>
        <div className="about-content">
          <div className="about-images">
            <img src={placeholder1} alt="Placeholder 1" className="about-image image1"/>
            <img src={placeholder2} alt="Placeholder 2" className="about-image image2"/>
          </div>
          <div className="about-text">
            <h3>MEET OUR PASSION</h3>
            <p>
              Welcome to our world of homemade soaps and candles! We take great pleasure in crafting each product with love and care, using only the finest natural ingredients. Our journey began with a simple desire to create eco-friendly, handmade products that bring joy and comfort to our customers. We believe in the power of nature, and every soap and candle we make reflects our commitment to sustainability and quality.
            </p>
            <p>
              Our soaps are crafted using traditional methods, ensuring each bar is unique and filled with the goodness of natural oils and botanicals. Our candles are made with pure soy wax and essential oils, providing a clean, long-lasting burn that fills your home with delightful aromas. Join us in celebrating the beauty of handmade, natural products and experience the freshness that comes from a labor of love.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
