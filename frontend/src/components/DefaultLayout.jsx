import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "./fragments/Navbar";
import { useEffect } from "react";
import axios from "axios";
import axiosClient from "../api/axiosClient";
import CartBar from "./fragments/CartBar";

const DefaultLayout = () => {
  const { token, setUser, cartOpen } = useStateContext();
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Navbar />
      {cartOpen && <CartBar />}
      <div className="mt-10">
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
