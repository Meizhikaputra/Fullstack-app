import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/fragments/Navbar";
import { FaCartArrowDown } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";

import axiosClient from "../api/axiosClient";
import { formatToRupiah } from "../api/productApi";
import { useStateContext } from "../contexts/ContextProvider";
import CartBar from "../components/fragments/CartBar";

const DetailProduct = () => {
  const { id } = useParams();

  const { cartOpen } = useStateContext();

  const [product, setProduct] = useState();
  useEffect(() => {
    axiosClient
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCart = () => {
    axiosClient.get("/carts").then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <Navbar />
      {cartOpen && <CartBar />}
      {product && (
        <div className="w-full mt-20">
          <div className="w-full flex justify-center my-5 mb-10">
            <Link to={"/homepage"} className="btn btn-primary">
              Kembali
            </Link>
            <h1 className="text-5xl  ">Halaman detail Produk</h1>
          </div>
          <div className="w-3/4 border m-5 shadow-xl rounded-lg  ">
            <div className=" flex">
              <img
                src={product.image}
                alt={product.image}
                className="w-[350px] h-[350px]"
              />
              <div className="w-full ml-10 p-10 ">
                <h2 className="text-4xl mb-10">{product.name}</h2>

                <h2 className="text-3xl">{formatToRupiah(product.price)}</h2>
                <div className="mt-10 w-full flex gap-4 justify-end items-end  h-[150px] z-10">
                  <button
                    className="border p-2  flex border-black hover:bg-black hover:text-white rounded-lg"
                    onClick={handleCart}
                  >
                    <FaCartArrowDown className="mr-2 text-xl" />
                    Masukan keranjang
                  </button>
                  <button className="border p-2  flex border-black hover:bg-black hover:text-white rounded-lg">
                    <IoBagCheckOutline className="mr-2 text-xl" />
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            {/* deskripsi */}
            <div className="w-full text-center">
              <h2 className="text-3xl mx-auto">Deskripsi</h2>
              <div className="mt-5 flex justify-start">
                <h2 className="text-2xl my-5">{product.description}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
