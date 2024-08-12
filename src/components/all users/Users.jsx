import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./users.css";
import { MdDeleteForever, MdOutlineOpenInNew } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Bar } from "react-chartjs-2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        setUsers(result);
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchAdminData();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const deleteUser = async (e, _id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;

    const confirmDelete = confirm(`Are you sure you want to delete product with ID ${_id}?`);
    if (!confirmDelete) {
      return;
    }

    thisClicked.innerText = "Deleting...";

    try {
      
      if (!token) {
        console.error("Token not found. Redirecting to login.");
        navigate("/login");
        return;
      }

      const deleteResponse = await fetch(`http://localhost:3001/api/users/${_id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!deleteResponse.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Product deleted successfully.");

      const response = await fetch("http://localhost:3001/api/users", {
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

    

        setUsers(data);
      
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
    }

    thisClicked.innerText = "Delete";
  }




  return (
    <div className="users-container">
      {users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  <Link to={`/users/${user._id}`} className="action-icon">
                    <MdOutlineOpenInNew  title="View"/>
                  </Link>
                  <Link to={`/users/${user._id}`} className="action-icon">
                    <FaRegEdit  title="Edit"/>
                  </Link>
                  <button onClick={(e) => deleteUser(e, user._id)} className="action-icon">
                    <MdDeleteForever title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found</p>
      )}
      
    </div>
  );
};

export default Users;
