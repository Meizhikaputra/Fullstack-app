import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "./fragments/Navbar";
import CartBar from "./fragments/CartBar";

const GuestLayout = () => {
  const { token, cartOpen } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Navbar />
      {cartOpen && <CartBar />}
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;
