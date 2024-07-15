import CardProduct from "../components/fragments/CardProduct";
import CartBar from "../components/fragments/CartBar";
import Navbar from "../components/fragments/Navbar";
import { useStateContext } from "../contexts/ContextProvider";

const Homepage = () => {
  const { cartOpen } = useStateContext();

  return (
    <>
      <Navbar />
      {cartOpen && <CartBar />}

      <div className="w-full justify-center text-center mx-auto  p-5 mt-20">
        <h1 className="text-2xl">Home Page</h1>
        <div className="flex flex-wrap gap-5 justify-center">
          <CardProduct />
        </div>
      </div>
    </>
  );
};

export default Homepage;
