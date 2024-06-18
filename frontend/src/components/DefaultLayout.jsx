import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "./fragments/Navbar";

const DefaultLayout = () => {
  const { user, token } = useStateContext();
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
