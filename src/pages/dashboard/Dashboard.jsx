import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./dashboard.css"




const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");




  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://mern-backend-ibm-project.vercel.app/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setUsers(result);
        
      } catch (error) {
        console.log(error)
      }
    };
    if (token) {
          fetchUsers();
        } else {
          navigate("/login");
        }
  }, [token, navigate]);



  return (
    <main>
      <Navbar />
      <table className="user-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user)=>(
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
};

export default Dashboard;
