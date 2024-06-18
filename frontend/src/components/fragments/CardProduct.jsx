import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

const CardProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axiosClient("/products").then((response) => {
      setProducts(response.data.products);
    });
  }, []);

  return products.map((product, key) => {
    return (
      <div
        className="card w-64 bg-base-100 shadow-xl border mt-5 max-h-80"
        key={key}
      >
        <figure className="px-10 pt-10">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{product.name}</h2>
          <h4>Rp. {product.price}</h4>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    );
  });
};

export default CardProduct;
