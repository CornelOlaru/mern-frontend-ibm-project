// import React from 'react'
// import "./products.css"
// import Navbar from '../../components/navbar/Navbar'



// const Products = () => {
//   return (
//     <div>
//       <Navbar/>
//     </div>
//   )
// }

// export default Products
import React, { useEffect, useState } from 'react';
import "./products.css";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [soaps, setSoaps] = useState([]);
  const [candles, setCandles] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const soapsResponse = await axios.get('/api/products/soaps');
        const candlesResponse = await axios.get('/api/products/candles');
        setSoaps(soapsResponse.data || []); // Ensure it sets an array
        setCandles(candlesResponse.data || []); // Ensure it sets an array
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="dashboard-content">
        <section>
          <h2>Soaps</h2>
          <div className="products-grid">
            {Array.isArray(soaps) && soaps.map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`}>
                  <img src={product.imageUrl.url} alt={product.imageUrl.filename} className="product-image" />
                </Link>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">Price: {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Candles</h2>
          <div className="products-grid">
            {Array.isArray(candles) && candles.map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`}>
                  <img src={product.imageUrl.url} alt={product.imageUrl.filename} className="product-image" />
                </Link>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">Price: {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      
      </div>
      <Footer />
    </main>
  );
};

export default Products;
