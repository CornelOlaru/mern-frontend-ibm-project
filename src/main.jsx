import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ProductDetails from "./pages/productPage/productDetails";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "register",
    element: <Signup/>,
  },
  {
    path: "product/:productId", 
    element: <ProductDetails />,
  },
  {
    path: "about",
    element: <About/>,
  },
  {
    path: "contact",
    element: <Contact/>,
  }
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
