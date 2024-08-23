import React, { useEffect, useState } from 'react'
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js'
import { Bar } from "react-chartjs-2";
import { useNavigate } from 'react-router-dom';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChart = () => {
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUsersData = async () => {
           
          try {
            const response = await fetch("https://mern-backend-ibm-project.vercel.app/api/users", {
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
        const fetchOrdersData = async () => {
           
          try {
            const response = await fetch("https://mern-backend-ibm-project.vercel.app/api/orders", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const result = await response.json();
            
            setOrders(result);
          } catch (error) {
            console.error(error);
          }
        };
        if (token) {
          fetchUsersData();
          fetchOrdersData();
        } else {
          navigate("/login");
        }
      }, [token, navigate]);
// const userItems = [...orders]
// console.log(userItems)
    const data = {
        labels: users.map((user)=>user.name),
        datasets: [{
          label: '# of Votes',
          data:  orders.map((order)=>order.totalPrice),
          borderWidth: 1
        }]
      }
     const  options= {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          },
          
        }, 
        legend:{
           labels:{
            fontSize: 26
           }
        }, 
      }
  return (
    <div>
      <Bar data={data} options={options} width={200}/>
    </div>
  )
}

export default BarChart
