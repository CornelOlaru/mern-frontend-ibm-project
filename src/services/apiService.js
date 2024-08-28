const API_BASE_URL = "https://mern-backend-ibm-project.vercel.app";

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching from ${endpoint}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getUsers = () => fetchData("users");
export const getProducts = () => fetchData("products");
export const getOrders = () => fetchData("orders");
