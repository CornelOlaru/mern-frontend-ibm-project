import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductId = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: { url: '', filename: '' },
    name: '',
    description: '',
    price: '',
    category: '',
    sku: '',
    stock: ''
  });

  const token = localStorage.getItem("token");

  const handleModifyData = () => {
    // Populate form data when toggling the form on
    if (!form) {
      setFormData({
        imageUrl: product.imageUrl || { url: '', filename: '' },
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        sku: product.sku || '',
        stock: product.stock || ''
      });
    }
    setForm(!form);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching the product details', error);
      }
    };

    fetchProduct();
  }, [productId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    try {
      const response = await fetch(`http://localhost:3001/api/products/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Ensure content-type header is set
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Error sending data to server");
      }

      const data = await response.json();
      setProduct(data);
      setForm(false);
      alert("Data modified successfully!");
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <div className="product-details">
        {!form ? (
          <React.Fragment key={product._id}>
            <img src={product.imageUrl?.url} alt={product.imageUrl?.filename} className="product-image" />
            <div className="product-info">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-sku">SKU: {product.sku}</p>
              <p className="product-price">${product.price}</p>
              <p className="product-sku">Stock: {product.stock}</p>
              <p className="product-category">Category: {product.category}</p>
              <p className="product-description">{product.description}</p>
            </div>
          </React.Fragment>
        ) : (
          <form key={product._id} onSubmit={handleSubmit}>
            <img src={formData.imageUrl?.url} alt={formData.imageUrl?.filename} className="product-image" />
            <div className="product-info">
              <input
                name="name"
                className="product-name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                name="sku"
                className="product-sku"
                value={formData.sku}
                onChange={handleInputChange}
              />
              <input
                name="price"
                className="product-price"
                value={formData.price}
                onChange={handleInputChange}
              />
              <input
                name="stock"
                className="product-stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
              <input
                name="category"
                className="product-category"
                value={formData.category}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                className="product-description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
        <button onClick={handleModifyData}>{form ? "Cancel" : "Modify"}</button>
      </div>
    </div>
  );
};

export default ProductId;
