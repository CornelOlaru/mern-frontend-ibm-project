import React, { useContext, useState } from "react";
import "./favorite.css";
import { FavoriteContext } from "../../context/favoriteContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
function Favorite() {
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const navigate = useNavigate();

 

  const updateFavoriteQuantity = (productId, delta) => {
    setFavorite((prevFavorite) =>
      prevFavorite.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.floor(1, item.quantity + delta) }
          : item
      )
    );
  };
  const removeFromFavorite = (productId) => {
    setFavorite((prevFavorite) =>
      prevFavorite.filter((item) => item._id !== productId)
    );
  };  
  
  
  if (favorite.length === 0) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <div className="content-wrapper empty-cart">
            <h2>My Favorite</h2>
            <p>Favorite is empty</p>
            <button onClick={() => navigate("/")}>Continue Browsing</button>
          </div>
          <div className="footer-spacing"></div>
          <Footer />
        </div>
      </>
    );
  }
  return ( 
  <>
  
    <Navbar />
  <div className="page-container">
    <div className="navbar-spacing"></div>
    <div className="content-wrapper">
      <div className="cart-container">
        <h2>My Favorite</h2>
        {favorite.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.imageUrl.url} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>
            <div className="item-quantity">
              <button onClick={() => updateFavoriteQuantity(item._id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateFavoriteQuantity(item._id, 1)}>+</button>
            </div>
            <p>${item.price * item.quantity}</p>
            <button className="remove-button" onClick={() => removeFromFavorite(item._id)}>
              <img src="/src/images/delete-icon.png" alt="Add to Cart" />
            </button>
            <button className="remove-button" onClick={() => removeFromFavorite(item._id)}>
              <img src="/src/images/delete-icon.png" alt="Remove" />
            </button>
          </div>
        ))}
        
      </div>
    </div>
    <div className="footer-spacing"></div>
    <Footer />
  </div>
  </>
  );
}

export default Favorite;
