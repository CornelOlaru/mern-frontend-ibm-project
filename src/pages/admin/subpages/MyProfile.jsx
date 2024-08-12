import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import "./myProfile.css";
import Navbar from '../../../components/navbar/Navbar';

const MyProfile = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    orders: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchUserProfile = async () => {
    //   try {
    //     setLoading(true);
    //     // Replace with your actual API call
    //     const response = await axios.get('http://localhost:3001/api/users/profile'); 
    //     setUserProfile(response.data);
    //   } catch (err) {
    //     setError('Failed to fetch user profile');
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 

          },
        });

        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching the user details', error);
      }
    };


    fetchUserProfile();
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='my-profile'>
      <Navbar />

      <div className='profile-container'>
        <h2>My Profile</h2>
        <div className='profile-info'>
          <p><strong>Name:</strong> {userProfile.name}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
        </div>
        <div className='order-history'>
          <h3>Order History</h3>
          <ul>
            {userProfile.orders.map(order => (
              <li key={order.id}>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Total:</strong> {order.total}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
