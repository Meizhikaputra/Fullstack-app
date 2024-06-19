import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "./fragments/Navbar";
import { useEffect } from "react";
import axios from "axios";
import axiosClient from "../api/axiosClient";

const DefaultLayout = () => {
  const { user, token, setUser } = useStateContext();
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
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
