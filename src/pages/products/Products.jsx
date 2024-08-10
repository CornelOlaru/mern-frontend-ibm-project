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
import { useParams, Link } from 'react-router-dom';
import './products.css';
import Navbar from '../../components/navbar/Navbar';

const Products = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const token = localStorage.getItem("token");
  // const { productId } = useParams();
  // console.log(productId); 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`Network response was not ok: ${response.status}`);
         
        }
        const data = await response.json();
        // console.log(data)
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
      
      if (!product || Object.keys(product).length === 0) {
        return <div>Loading...</div>;
      }
      
      const {
    imageUrl = { url: '', filename: '' },
    name = 'No Name',
    description = 'No Description',
    price = 'No Price',
    category = 'No Category',
    sku = 'No SKU',
  } = product;

  return (
    <div className="product-page">
    
<Navbar/>
      <div className="related-products">
        <h2>All Products</h2>
        <div className="related-products-grid">
          {product.map((relatedProduct) => (
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
              <button className="button add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
