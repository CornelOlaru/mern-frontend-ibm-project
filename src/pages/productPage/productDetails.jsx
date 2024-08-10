import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import './productDetails.css';
import Navbar from '../../components/navbar/Navbar';
import {CartContext} from '../../context/cartContext';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useContext(CartContext); 
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

    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products`);
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setRelatedProducts(data.filter(p => p._id !== productId).slice(0, 5));
      } catch (error) {
        console.error('Error fetching the related products', error);
      }
    };

    fetchProduct();
    // if (token) {
    // } else {
    //   navigate("/login");
    // }
    fetchRelatedProducts();
  }, [productId]);

  if (!product || Object.keys(product).length === 0) {
    return <div>Loading...</div>;
  }

   // Ensure all properties exist before trying to access them
  


  const {
    imageUrl = { url: '', filename: '' },
    name = 'No Name',
    description = 'No Description',
    price = 'No Price',
    category = 'No Category',
  } = product;

  const handleAddToCart = () => {
    const quantity = parseInt(document.getElementById('quantity').value);
    addToCart(product, quantity);
  };

  return (
    <div key={product._id} className="product-details">
    <div className="product-info">
    <img src={imageUrl.url} alt={imageUrl.filename} className="product-image" />
      <h1 className="product-name">{name}</h1>
      <p className="product-description">{description}</p>
      <p className="product-price">Price: {price}</p>
      <p className="product-category">Category: {category}</p>
    </div>
  </div>
);
    <main>
    <Navbar />
    <div className="product-page">
      <div className="product-details">
        <img src={imageUrl.url} alt={imageUrl.filename} className="product-image" />
        <div className="product-info">
          <h1 className="product-name">{name}</h1>
          <p className="product-price">${price}</p>
          <div className="quantity">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
          </div>
          <button className="button add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        
          <p className="product-category">Category: {category}</p>
          <p className="product-description">{description}</p>
        </div>
      </div>

      <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-products-grid">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id} className="related-product-card">
              <Link to={`/product/${relatedProduct._id}`}>
                <img src={relatedProduct.imageUrl.url} alt={relatedProduct.imageUrl.filename} className="related-product-image" />
              </Link>
              <h3 className="related-product-name">{relatedProduct.name}</h3>
              <p className="related-product-price">${relatedProduct.price}</p>
              <div className="quantity">
                <label htmlFor={`quantity-${relatedProduct._id}`}>Quantity</label>
                <input type="number" id={`quantity-${relatedProduct._id}`} name={`quantity-${relatedProduct._id}`} min="1" defaultValue="1" />
              </div>
              <button className="button add-to-cart" onClick={() => addToCart(relatedProduct, parseInt(document.getElementById(`quantity-${relatedProduct._id}`).value))}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </main>
  
};

export default ProductDetails;

