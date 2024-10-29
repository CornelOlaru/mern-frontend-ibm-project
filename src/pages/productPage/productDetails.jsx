import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from "../../components/footer/Footer";
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContext'; 
import './productDetails.css';
import { getProductById, getProducts } from '../../services/apiService';
import Loading from '../../components/loading spinners/Loading';
import { FavoriteContext } from '../../context/favoriteContext';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { addToFavorite } = useContext(FavoriteContext);
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
  const handleAddToFavorite = () => {
    const quantity = parseInt(document.getElementById('quantity').value);
    addToFavorite(product, quantity);
  };
  return (
    <>
    <Navbar />
    <div className="product-page">
      <div className="product-details">
        <img src={imageUrl.url} alt={imageUrl.filename} className="product-image" />
        <div className="product-info">
          <h1 className="product-name">{name}</h1>
          <p className="product-price">Price: ${price}</p>
          <div className="quantity">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
          </div>
          <button className="button add-to-cart" onClick={handleAddToCart}>
          <FiShoppingCart className="" style={{marginRight:".5rem"}} />
          Add to Cart</button>
          <button className="button add-to-favorite" onClick={handleAddToFavorite}><MdFavoriteBorder style={{marginRight:".5rem"}}/>Add to Favorite</button>
          <p className="product-category">Category: {category}</p>
          <p className="product-description">{description}</p>
        </div>
      </div>

      <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-products-grid">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id} className="product-card">
              <Link to={`/product/${relatedProduct._id}`}>
                <img src={relatedProduct.imageUrl.url} alt={relatedProduct.imageUrl.filename} className="product-image" />
              </Link>
              <h3 className="product-name">{relatedProduct.name}</h3>
              <p className="product-price">${relatedProduct.price}</p>
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
    </>
  );
};

export default ProductDetails;
