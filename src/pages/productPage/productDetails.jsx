import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './productDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/${productId}`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        console.log(response)
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setProduct(data);
      } catch (error) {
        console.error('Error fetching the product details', error);
      }
    };
    fetchProduct();
    // if (token) {
    // } else {
    //   navigate("/login");
    // }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

   // Ensure all properties exist before trying to access them
   const {
    imageUrl = {
      url: '',
      filename:'',
    },
    name = 'No Name',
    description = 'No Description',
    price = 'No Price',
    category = 'No Category',
    stock = 'No Stock'
  } = product;

  return (
    <div key={product._id} className="product-details">
    <div className="product-info">
    <img src={imageUrl.url} alt={imageUrl.filename} className="product-image" />
      <h1 className="product-name">{name}</h1>
      <p className="product-description">{description}</p>
      <p className="product-price">Price: {price}</p>
      <p className="product-category">Category: {category}</p>
      <p className="product-stock">Stock: {stock}</p>
    </div>
  </div>
);
};

export default ProductDetails;