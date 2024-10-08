  import React, { useEffect, useState, useContext } from 'react';
  import { useParams, Link } from 'react-router-dom';
  import './products.css';
  import Navbar from '../../components/navbar/Navbar';
  import { CartContext } from '../../context/cartContext'; 
  import SearchBar from '../../components/searchInput/searchInput';
  import ProductList from '../displaySearch/displaySearch';
  import Footer from '../../components/footer/Footer';
import { getProducts } from '../../services/apiService';
import Loading from '../../components/loading spinners/Loading';

  const Products = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);  
    const token = localStorage.getItem("token");
    const { addToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchProduct = async () => {
        setLoading(true)
        try {
          const response = await getProducts();
          setProduct(response);
        } catch (error) {
          console.error('Error fetching the product details', error);
        } finally {
          setLoading(false)
        }
      };

      fetchProduct();
    }, [productId, token]);
if (loading) {
  return <div><Loading/></div>
}
    const searchProducts = async (query) => {
      console.log('Search query:', query); // Log the search query
      try {
        const response = await fetch(`https://mern-backend-ibm-project.vercel.app/api/products/search?q=${encodeURIComponent(query)}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
    
        const data = await response.json();
        console.log('Search results:', data); // Log the search results
    
        // Check if data is an array and has items
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts([]); // If no products found, set empty array
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setProducts([]); // Set products to an empty array if there is an error
      }
    };
    

    return (
      <>
      <div className="product-page-2">
        <Navbar />
        <div className="related-products-2">
          <h2>All Products</h2>
          <div>
            <SearchBar onSearch={searchProducts} />
            <ProductList products={products} /> 
          </div>
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
                <button className="button add-to-cart" onClick={() => addToCart(relatedProduct, parseInt(document.getElementById(`quantity-${relatedProduct._id}`).value))}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
        <Footer/>
            </>
    );
  };

  export default Products;
