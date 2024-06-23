import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Link } from "react-router-dom";

const CardProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axiosClient("/products").then((response) => {
      setProducts(response.data.data);
    });
  }, []);

  return products.map((product, key) => {
    return (
      <div
        className="card w-64 bg-base-100 shadow-xl border  max-h-80 mt-5"
        key={key}
      >
        <div className="w-full overflow-hidden h-1/2">
          <img src={product.image} className="w-full" alt={product.image} />
        </div>
        <div className="items-center text-center h-1/2">
          <h2 className="text-xl">{product.name}</h2>
          <h4>{product.price}</h4>
        </div>
      </div>
    );
  });
};

export default CardProduct;
