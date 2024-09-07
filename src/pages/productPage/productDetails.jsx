import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from "../../components/footer/Footer";
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContext'; 
import './productDetails.css';
import { getProductById, getProducts } from '../../services/apiService';
import Loading from '../../components/loading spinners/Loading';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await getProductById(productId);
        setProduct(response);
      } catch (error) {
        console.error('Error fetching the product details', error);
      } finally {
        setLoading(false)
      }
    };
   
    const fetchRelatedProducts = async () => {
      try {
        const response = await getProducts();
        setRelatedProducts(response.filter(p => p._id !== productId).slice(0, 5));
      } catch (error) {
        console.error('Error fetching the related products', error);
      }
    };
    
    fetchProduct();
    fetchRelatedProducts();
  }, [productId]);
  
  
  if (!product || Object.keys(product).length === 0 && loading) {
    return <div><Loading/></div>;
  }

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
    < Footer />
    </main>
  );
};

export default ProductDetails;
