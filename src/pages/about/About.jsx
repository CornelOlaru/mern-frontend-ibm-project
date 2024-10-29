import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./about.css";
import placeholder1 from "../../images/placeholder1.png";
import placeholder2 from "../../images/placeholder2.jpg";
import placeholder3 from "../../images/placeholder3.jpg";
import background from "../../images/backround.jpg";
import Slider from "react-slick";

const About = () => {
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    // Handler to update state on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imagesSliderSettings = {
    dots: false,
    fade: true,
    lazyLoad: true,
    autoplay: true,
    infinite: true,
    speed: 700,
    waitForAnimate: false,
    draggable: true,
    initialSlide: 0,
    arrows: false,
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Navbar />
      <div className="about-page">
        <main className="about-container">
          <h1 className="about-title">A STORY OF FRESHNESS</h1>
          <div className="about-content">
            <div className="about-images">
              <Slider {...imagesSliderSettings}>
                <img
                  src={placeholder1}
                  alt="Placeholder 1"
                  className="about-image1"
                />
                <img
                  src={placeholder2}
                  alt="Placeholder 2"
                  className="about-image2"
                />
                <img
                  src={placeholder3}
                  alt="Placeholder 3"
                  className="about-image3"
                />
                <img
                  src={background}
                  alt="Lady with Soaps"
                  className="about-image4"
                />
              </Slider>
            </div>
            <div className="about-text">
              <h3>MEET OUR PASSION</h3>
              <p>
                Welcome to our world of homemade soaps and candles! We take
                great pleasure in crafting each product with love and care,
                using only the finest natural ingredients. Our journey began
                with a simple desire to create eco-friendly, handmade products
                that bring joy and comfort to our customers. We believe in the
                power of nature, and every soap and candle we make reflects our
                commitment to sustainability and quality.
              </p>
              <p className={`about-toggle-paragraph ${showMore ? "expanded" : ""}`}>
                Our soaps are crafted using traditional methods, ensuring each
                bar is unique and filled with the goodness of natural oils and
                botanicals. Our candles are made with pure soy wax and essential
                oils, providing a clean, long-lasting burn that fills your home
                with delightful aromas. Join us in celebrating the beauty of
                handmade, natural products and experience the freshness that
                comes from a labor of love.
              </p>
              {/* Only show the button on smaller screens */}
              {isMobile && (
                <button className="about-button" onClick={toggleShowMore}>
                  {showMore ? "Read Less" : "Read More..."}
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default About;
