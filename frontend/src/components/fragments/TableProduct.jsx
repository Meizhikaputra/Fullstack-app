import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { useSnackbar } from "notistack";
import { formatToRupiah, getProducts } from "../../api/productApi";

const TableProduct = ({ products, loading, setProducts }) => {
  const [msg, setMsg] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (id) => {
    const alert = confirm("Anda yakin ingin menghapus product ini?");
    if (alert) {
      axiosClient.delete(`/products/${id}`).then(async (res) => {
        setMsg(res.data.msg);
        const refresh = await getProducts();
        setProducts(refresh);
        enqueueSnackbar("berhasil menghapus data produk", {
          variant: "success",
        });
      });
    }
  };

  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>#</th>
          <th>Nama product</th>
          <th>Descriptions</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {loading &&
          products.map((product, key) => {
            return (
              <tr key={product.id}>
                <td>{key + 1}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.image}
                    className="w-[100px] h-[100px] rounded-full"
                  />
                </td>
                <td>{product.description}</td>
                <td>{formatToRupiah(product.price)}</td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      className="btn btn-xs btn-info text-white"
                      to={`/products/${key + 1} `}
                    >
                      Lihat
                    </Link>
                    <Link
                      className="btn btn-xs btn-secondary text-white"
                      to={`/products/edit/${product.id}`}
                    >
                      Edit
                    </Link>
                    <Link
                      className="btn btn-xs btn-error text-white"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
      {/* foot */}
      <tfoot>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Descriptions</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default TableProduct;
