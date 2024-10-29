import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./products.css";
import Navbar from "../../components/navbar/Navbar";
import { CartContext } from "../../context/cartContext";
import SearchBar from "../../components/searchInput/searchInput";
import ProductList from "../displaySearch/displaySearch";
import Footer from "../../components/footer/Footer";
import { getProducts } from "../../services/apiService";
import Loading from "../../components/loading spinners/Loading";
import { FavoriteContext } from "../../context/favoriteContext";
import { IconContext } from "react-icons";
import { MdFavoriteBorder } from "react-icons/md";


const Products = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
const {addToFavorite} = useContext(FavoriteContext);
 
//Fetching products through apiService
useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        setProduct(response);
      } catch (error) {
        console.error("Error fetching the product details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, token]);
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="product-page-2">
        <Navbar />
        <div className="related-products-2">
          <h2>All Products</h2>
          <div>
            <ProductList products={products} />
          </div>
          <div className="related-products-grid-2">
            {product.map((relatedProduct) => (
              <div key={relatedProduct._id} className="product-card">
                <Link to={`/product/${relatedProduct._id}`}>
                <div>

                  <img
                    src={relatedProduct.imageUrl.url}
                    alt={relatedProduct.imageUrl.filename}
                    className="product-image"
                    />
                     <IconContext.Provider value={{ size: "", className: "favorite-product" }}>
                        <MdFavoriteBorder />
                      </IconContext.Provider>
                    </div>
                <h3 className="product-name">
                  {relatedProduct.name}
                </h3>
                </Link>
                <p className="product-price">
                  ${relatedProduct.price}
                </p>
                <div className="quantity">
                  <label htmlFor={`quantity-${relatedProduct._id}`}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    id={`quantity-${relatedProduct._id}`}
                    name={`quantity-${relatedProduct._id}`}
                    min="1"
                    defaultValue="1"
                  />
                </div>
                <button
                  className="button add-to-cart"
                  onClick={() =>
                    addToCart(
                      relatedProduct,
                      parseInt(
                        document.getElementById(
                          `quantity-${relatedProduct._id}`
                        ).value
                      )
                    )
                  }
                >
                  Add to Cart
                </button>
                <button
                  className="button add-to-cart"
                  onClick={() =>
                    addToFavorite(
                      relatedProduct,
                      parseInt(
                        document.getElementById(
                          `quantity-${relatedProduct._id}`
                        ).value
                      )
                    )
                  }
                >
                  Add to Favorite
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
