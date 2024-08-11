import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import './products.css';
import Navbar from '../../components/navbar/Navbar';
import { CartContext } from '../../context/cartContext'; 


const Products = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const token = localStorage.getItem("token");
  const { addToCart } = useContext(CartContext);

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
  
  } = product;

  return (
    <div className="product-page-2">
    
<Navbar/>
      <div className="related-products-2">
        <h2>All Products</h2>
        <div className="related-products-grid-2">
          {product.map((relatedProduct) => (
            <div key={relatedProduct._id} className="related-product-card-2">
              <Link to={`/product/${relatedProduct._id}`}>
                <img src={relatedProduct.imageUrl.url} alt={relatedProduct.imageUrl.filename} className="related-product-image-2" />
              </Link>
              <h3 className="related-product-name-2">{relatedProduct.name}</h3>
              <p className="related-product-price-2">${relatedProduct.price}</p>
              <div className="quantity-2">
                <label htmlFor={`quantity-${relatedProduct._id}`}>Quantity</label>
                <input type="number" id={`quantity-${relatedProduct._id}`} name={`quantity-${relatedProduct._id}`} min="1" defaultValue="1" />
              </div>
              <button className="button add-to-cart" onClick={() => addToCart(relatedProduct, parseInt(document.getElementById(`quantity-${relatedProduct._id}`).value))}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
