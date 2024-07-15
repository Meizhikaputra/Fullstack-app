import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalProduct from "../components/fragments/ModalProduct";
import axiosClient from "../api/axiosClient";
import TableProduct from "../components/fragments/TableProduct";

const Products = () => {
  const [products, setProducts] = useState();
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = async () => {
      const res = await axiosClient.get("/products");
      setProducts(res.data.data);
      setLoading(true);
    };
    data();
  }, []);

  return (
    <>
      <div className="w-full p-5">
        {modal && (
          <ModalProduct closeModal={closeModal} setProducts={setProducts} />
        )}
        <div className="p-5">
          <h1 className="text-3xl ">Semua Produk</h1>
          <Link onClick={openModal} className="btn btn-primary  mt-5">
            Tambah product
          </Link>
        </div>
        <div className="w-full border my-5 shadow-lg">
          <div className="overflow-x-auto">
            <TableProduct
              products={products}
              loading={loading}
              setProducts={setProducts}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
