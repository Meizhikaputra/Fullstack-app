import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import DetailProduct from "./pages/DetailProduct";
import EditProduct from "./pages/EditProduct";

const router = createBrowserRouter([
  // Page For All User

  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/products/:id",
    element: <DetailProduct />,
  },

  // DEFAULT LAYOUT FOR USER AUTH------------------
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/user" />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/edit/:id",
        element: <EditProduct />,
      },
    ],
  },

  //   GUEST LAYOUT FOR GUEST--------------------
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
