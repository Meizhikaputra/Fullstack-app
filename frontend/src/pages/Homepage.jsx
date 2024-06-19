import CardProduct from "../components/fragments/CardProduct";
import Navbar from "../components/fragments/Navbar";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full justify-center text-center mx-auto mt-5 p-5">
        <h1 className="text-2xl">Home Page</h1>
        <div className="flex flex-wrap gap-5 justify-center">
          <CardProduct />
        </div>
      </div>
    </>
  );
};

export default Homepage;
