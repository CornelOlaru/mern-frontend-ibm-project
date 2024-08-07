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
    <div className="product-details">
      <img src={imageUrl.url} alt={imageUrl.filename} className="product-image" />
      <div className="product-info">
        <h1 className="product-name">{name}</h1>
        {/* <p className="product-sku">SKU: {sku}</p> */}
        <p className="product-price">${price}</p>
        <div className="quantity">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
        </div>
        <button className="button add-to-cart">Add to Cart</button>
        <button className="button buy-now">Buy Now</button>
        <p className="product-category">Category: {category}</p>
        <p className="product-description">{description}</p>
      </div>
    </div>
  );
};
 
export default ProductDetails;