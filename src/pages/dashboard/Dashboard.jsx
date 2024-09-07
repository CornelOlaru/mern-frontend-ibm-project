import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./dashboard.css";
import Footer from "../../components/footer/Footer";
import placeholder1 from "../../images/placeholder1.png";
import placeholder2 from "../../images/placeholder2.jpg";
import { getProducts } from "../../services/apiService";
import Loading from "../../components/loading spinners/Loading";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const soaps = products.filter((product) => product.category === "Soaps");
  const candles = products.filter((product) => product.category === "Candles");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, navigate]);
  if (loading) {
    return <Loading />;
  }
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <main>
      <Navbar />
      <div className="dashboard-content">
        <section className="about-section">
          <h2 className="about-title">Discover Our Story</h2>
          <div className="about-content">
            <div className="about-images">
              <img
                src={placeholder1}
                alt="Placeholder 1"
                className="about-image image1"
              />
              <img
                src={placeholder2}
                alt="Placeholder 2"
                className="about-image image2"
              />
            </div>
            <div className="about-text">
              <p>
                Welcome to our world of homemade soaps and candles! Discover our
                passion for crafting eco-friendly, handmade products using only
                the finest natural ingredients.
              </p>
              <Link to="/about" className="about-button">
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
        <section>
          <h2>Soaps</h2>
          <Slider {...sliderSettings}>
            {soaps.map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.imageUrl.url}
                    alt={product.imageUrl.filename}
                    className="product-image"
                  />
                </Link>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">Price: {product.price} $</p>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <section>
          <h2>Candles</h2>
          <Slider {...sliderSettings}>
            {candles.map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.imageUrl.url}
                    alt={product.imageUrl.filename}
                    className="product-image"
                  />
                </Link>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">Price: {product.price} $</p>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Dashboard;
