import React from 'react';
import { Link } from 'react-router-dom';


const ProductList = ({ products }) => {
  
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <Link to={`/product/${product._id}`}>
            <img src={product.imageUrl.url} alt={product.imageUrl.filename} className="product-image" />
          </Link>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
