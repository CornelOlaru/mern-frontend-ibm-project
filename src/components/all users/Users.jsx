import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./users.css";
import { MdDeleteForever, MdOutlineOpenInNew } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { getUsers, softDeleteUser } from "../../services/apiService";
import Loading from "../loading spinners/Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        //fetching from apiService

        const response = await getUsers(token);
        setUsers(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchAdminData();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const deleteUser = async (e, _id) => {
    const thisClicked = e.currentTarget;
    const confirmDelete = confirm(
      `Are you sure you want to delete the user with ID ${_id}?`
    );
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

      const deleteResponse = await softDeleteUser(_id, token);

      // Check if response includes a property indicating success
      if (deleteResponse && deleteResponse.error) {
        throw new Error(
          `Failed to delete user with ID ${_id}: ${deleteResponse.error}`
        );
      }

      console.log(`User with ID ${_id} deleted successfully.`);

      // Fetch updated list of users instead of re-fetching all users
      const updatedUsers = await getUsers(token);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting the user:", error);
    } finally {
      thisClicked.innerText = "Delete";
    }
  };

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
                    <MdOutlineOpenInNew title="View" />
                  </Link>
                  <Link to={`/users/${user._id}`} className="action-icon">
                    <FaRegEdit title="Edit" />
                  </Link>
                  <button
                    onClick={(e) => deleteUser(e, user._id)}
                    className="action-icon"
                  >
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
