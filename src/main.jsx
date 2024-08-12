import React from "react";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ProductDetails from "./pages/productPage/productDetails";
import Products from "./pages/products/Products";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact"
import Admin from "./pages/admin/Admin";
import Distributor from "./pages/distributor/Distributor";
import ProtectedRoutes from "./components/protectedRoute/ProtectedRoutes";
import MyProfile from "./pages/admin/subpages/MyProfile";
import Cart from "./pages/cart/Cart";
import Help from "./pages/help/Help";
import { CartProvider } from "./context/cartContext";
import UserId from "./pages/admin/subpages/UserId page/UserId";
import OrderID from "./pages/admin/subpages/OrderId page/OrderID";

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
    path: "products", 
    element: <Products />,
  },
  // {
  //   path: "product/:productId", 
  //   element: <ProductDetails />,
  // },
  {
    path: "product/:productId", 
    element: <ProductDetails />,
  },
  {
    path: "users/:userId", 
    element: <UserId />,
  },
  {
    path: "orders/:orderId", 
    element: <OrderID />,
  },
  {
    path: "about",
    element: <About/>,
  },
  {
    path: "contact",
    element: <Contact/>,
  },
  {
    path: "my-profile",
    element: <MyProfile/>,
  },
  {
    element: <ProtectedRoutes roles={["admin"]} />,
    children: [
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
  {
    element: <ProtectedRoutes roles={["distributor"]} />,
    children: [
      {
        path: "distributor",
        element: <Distributor />,
      },
    ],
  },
  {
    element: <ProtectedRoutes roles={["admin"]} />,
    children: [
      {
        path: "admin/users",
        element: <Admin />,
      },
    ],
  },
  {
    element: <ProtectedRoutes roles={["admin"]} />,
    children: [
      {
        path: "admin/orders",
        element: <Admin />,
      },
    ],
  },
  {
    element: <ProtectedRoutes roles={["admin"]} />,
    children: [
      {
        path: "admin/stats",
        element: <Admin />,
      },
    ],
  },
 
  
  {
    path: "cart",
    element: <Cart/>,
  },
  {
    path: "help",
    element: <Help/>,
  }
]);


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider> {}
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
