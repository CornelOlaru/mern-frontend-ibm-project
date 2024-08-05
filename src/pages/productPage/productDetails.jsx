
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './productDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching the product details', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="products-details">
      

       <img src={product.imageUrl} alt={product.name} className="products-image" />
      <div className="products-info">
        <h1 className="products-name">{product.name}</h1>
        <p className="products-description">{product.description}</p>
        <p className="products-price">Price: {product.price}</p>
        <p className="products-category">Category: {product.category}</p>
        <p className="products-stock">Stock: {product.stock}</p>
      </div> 

    </div>
  );
};

export default ProductDetails;