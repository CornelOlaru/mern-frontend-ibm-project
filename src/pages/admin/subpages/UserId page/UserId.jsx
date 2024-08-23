import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./userId.css";

const UserId = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const [form, setForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });
  
  const handleModifyData = () => {
    setForm(!form);
  };
  
  useEffect(() => {
    try {
      const getUserById = async () => {
        const response = await fetch(
          `https://mern-backend-ibm-project.vercel.app/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        if (data && typeof data === "object") {
          setUser(data);
          setFormData({
            name: data.name || "",
            email: data.email || "",
            role: data.role || ""
          });
        } else {
          console.error("Invalid user data received:", data);
        }
      };

      if (token && userId) {
        getUserById();
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  }, [token, userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://mern-backend-ibm-project.vercel.app/api/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Data modified successfully!");
        const updatedUser = await response.json();
        setUser(updatedUser);
        setForm(false);
      } else {
        const errorResponse = await response.text();
        console.error("Response status:", response.status);
        console.error("Response body:", errorResponse);
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>; // Display loading while fetching user data
  }

  return (
    <div className="user-container">
      {!form ? (
        <div key={user._id} className="user-info">
          <label className="user-label" htmlFor="name">
            Name:
            <input type="text" value={user.name} disabled className="user-input" />
          </label>
          <label className="user-label" htmlFor="email">
            Email:
            <input type="email" value={user.email} disabled className="user-input" />
          </label>
          <label className="user-label" htmlFor="role">
            Role:
            <input type="text" value={user.role} disabled className="user-input" />
          </label>
        </div>
      ) : (
        <div key={user._id} className="user-info">
          <label className="user-label" htmlFor="name">
            Name:
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="user-input"
            />
          </label>
          <label className="user-label" htmlFor="email">
            Email:
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="user-input"
            />
          </label>
          <label className="user-label">
            Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="user-select"
            >
              <option value="customer">Customer</option>
              <option value="distributor">Distributor</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>
      )}
      <div className="user-buttons">
        <button className="btn btn-primary" onClick={handleModifyData}>
          {form ? "Cancel" : "Modify"}
        </button>
        {form && <button className="btn btn-secondary" onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default UserId;
