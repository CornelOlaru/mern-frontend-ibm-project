import { useNavigate } from "react-router-dom";

const PROD_API_BASE_URL = "https://mern-backend-ibm-project.vercel.app";
const DEV_API_BASE_URL = "http://localhost:3001";
const fetchData = async (endpoint, method = "GET", body, token = null) => {
  try {
    
    const response = await fetch(`${PROD_API_BASE_URL}/${endpoint}`, {
      method,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    console.log(response);
    if (!response.ok) {
      if (response.status === 403) {
        //If token is invalid or missing, clear token and redirect to login
        localStorage.removeItem("token");
        navigate("/login");
      }
      const errorData = await response.json();
      console.error(`Error ${method} from ${endpoint}:`, errorData);
      throw new Error(
        `Error ${method} form ${endpoint}: ${errorData.message} || ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUsers = async (token) =>
  fetchData("api/users", "GET", null, token);

export const saveUser = async () => postData("user/register");

export const getUsersById = async (_id, token) =>
  fetchData(`api/users/${_id}`, "GET", null, token);

export const saveUserById = async (_id, token) =>
  fetchData(`api/users/${_id}`, "PUT", body, token);

export const getProducts = async () => fetchData("api/products");

export const getProductById = async (_id) =>
  fetchData(`api/products/${_id}`, "GET", null, null);

export const softDeleteUser = async (_id, token) =>
  fetchData(`api/users/${_id}`, "PUT", { deleted: true }, token);

export const getOrders = async (token) =>
  fetchData("api/orders", "GET", null, token);

export const softDeleteOrder = async (_id, token) =>
  fetchData(`api/orders/${_id}`, "PUT", { deleted: true }, token);

export const saveOrder = async (orderDetails, token) =>
  fetchData("api/orders", "POST", orderDetails, token);
