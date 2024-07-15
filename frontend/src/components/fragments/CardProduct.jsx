import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Link } from "react-router-dom";
import { formatToRupiah } from "../../api/productApi";

const CardProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axiosClient("/products").then((response) => {
      setProducts(response.data.data);
    });
  }, []);

  return products.map((product, key) => {
    return (
      <div className="group" key={key}>
        <Link
          to={`/products/${product.id}`}
          className="card w-64 bg-base-100 shadow-xl border  h-[300px] mt-5   group-hover:scale-105 transition duration-300"
        >
          <div className="">
            <div className="w-full overflow-hidden h-[150px]">
              <img src={product.image} className="w-full" alt={product.image} />
            </div>
            <div className="items-center text-center h-1/2">
              <h2 className="text-xl">{product.name}</h2>
              <h4>{formatToRupiah(product.price)}</h4>
              <p>{product.description}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  });
};

export default CardProduct;
