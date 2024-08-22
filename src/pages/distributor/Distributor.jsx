import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Aside from "../../components/aside/Aside";
import Statistics from "../../components/statistics/Statistics";
import Users from "../../components/all users/Users";
import Orders from "../../components/orders/Orders";
import "./distributor.css";
import { Link, useParams } from "react-router-dom";
import { MdDeleteForever, MdOutlineOpenInNew } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Distributor = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem("token");
  const {productId} = useParams();
   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [token]);



  const deleteProduct = async (e, _id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;

    const confirmDelete = confirm(`Are you sure you want to delete product with ID ${_id}?`);
    if (!confirmDelete) {
      return;
    }

    thisClicked.innerText = "Deleting...";

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Redirecting to login.");
        navigate("/login");
        return;
      }

      const deleteResponse = await fetch(`http://localhost:3001/api/products/${_id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!deleteResponse.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Product deleted successfully.");

      const response = await fetch("http://localhost:3001/api/products", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response received:", data);

    

        setProducts(data);
      
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
    }

    thisClicked.innerText = "Delete";
  }
  useEffect(()=>{

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/${productId}`, {
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
}, [productId])
  return (
    <main className="admin-container">
      <Navbar />
      <div className="aside-distributor">

      <Aside  />
      </div>
      <div className="distributor-dashboard">
        <Statistics/>
        <h1>Products</h1>
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td> {product.stock}</td>
                <td> {product.category}</td>
                <td>
                  <Link to={`/products/${product._id}`} className="action-icon">
                    <MdOutlineOpenInNew title="View" />
                  </Link>
                  <Link to={`/products/${product._id}`} className="action-icon">
                    <FaRegEdit title="Edit" />
                  </Link>
                  <button onClick={(e) => deleteProduct(e, product._id)} className="action-icon">
                    <MdDeleteForever title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Distributor;
