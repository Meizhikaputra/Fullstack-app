import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../api/axiosClient";
const CartBar = () => {
  const { cartOpen, closeCart } = useStateContext();

  const [carts, setCarts] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    axiosClient.get("/carts").then((res) => {
      setCarts(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-0"
      onClick={closeCart}
    >
      <div
        className="flex justify-start"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={` w-1/2 lg:w-1/3 transform transition-transform shadow-xl text-center ease-in-out ${
            !cartOpen ? "translate-x-full" : "translate-x-0 "
          }  bg-black text-white fixed -z-10  top-0 right-0 h-full
       overflow-y-auto`}
        >
          <div className=" w-full p-3">
            <h2 className="text-center mt-20 text-2xl">Keranjang anda</h2>
            {!loading &&
              carts.map((cart) => {
                return (
                  <div
                    className="w-full h-52  mt-5 border-[1px] border-bottom flex p-2"
                    key={cart.id}
                  >
                    <div className="w-[250px] h-full my-auto flex justify-center border  items-center flex-wrap ">
                      <img
                        src={cart.image}
                        alt={cart.image}
                        className="w-[100px] h-[100px]"
                      />
                      <h2>{cart.name}</h2>
                    </div>
                    <div className="w-full flex justify-center items-center border ml-5">
                      <div className=" flex">
                        <button className="border p-1 text-xs">-</button>
                        <h3 className="mx-3">{cart.quantity}</h3>
                        <button className="border p-1 text-xs">+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBar;
