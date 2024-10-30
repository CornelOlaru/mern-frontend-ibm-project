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
import Modal from "../../components/modal/Modal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const soaps = products.filter((product) => product.category === "Soaps");
  const candles = products.filter((product) => product.category === "Candles");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
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
  const productsSliderSettings = {
    className: "slider variable-width",
    dots: true,
    infinite: false,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    draggable: true,
    rows: 1,
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

  return (
    <main>
      <Navbar />
      <Modal
        shouldShow={showModal}
        onRequestClose={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <div>Your Modal</div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
          architecto, expedita omnis eligendi eum enim in velit necessitatibus
          hic sed aliquam dolores autem voluptate saepe, quae ad obcaecati
          accusantium facilis pariatur sit rem. Quos consequuntur, consequatur,
          suscipit quam dolor excepturi fuga aut quas soluta maiores ipsum,
          expedita facere vel eum!
        </p>
      </Modal>
      <div className="dashboard-container">
        <section className="dashboard-section">
          <h2 className="dashboard-title">Discover Our Story</h2>
          <div className="dashboard-content">
            <div className="dashboard-images">
              <Slider {...imagesSliderSettings}>
                <img
                  src={placeholder1}
                  alt="Placeholder 1"
                  className="dashboard-image1"
                />

                <img
                  src={placeholder2}
                  alt="Placeholder 2"
                  className="dashboard-image2"
                />
              </Slider>
            </div>

            <div className="dashboard-text">
              <p>
                Welcome to our world of artisanal soaps and candles! Discover
                our passion for crafting eco-friendly, handmade products. Each
                item is thoughtfully made using only the finest natural
                ingredients, bringing a touch of nature and care into your daily
                rituals.
              </p>
              <Link to="/about" className="dashboard-button">
                Learn More About Us
              </Link>
              <div className="">
                <button
                  onClick={() => {
                    setShowModal((prev) => !prev);
                  }}
                >
                  show modal
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="products-section">
          <h2>Soaps</h2>

          <Slider {...productsSliderSettings}>
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
                  <Link className="product-name">
                    <h3 className="product-name">{product.name} </h3>
                  </Link>
                  <p className="product-price">Price: {product.price} $</p>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <section className="products-section">
          <h2>Candles</h2>
          <Slider {...productsSliderSettings}>
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
                  <Link className="product-name">
                    <h3 className="product-name">{product.name}</h3>
                  </Link>
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
