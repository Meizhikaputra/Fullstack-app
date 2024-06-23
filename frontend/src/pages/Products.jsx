import { useState } from "react";
import { Link } from "react-router-dom";
import ModalProduct from "../components/fragments/ModalProduct";
import { useStateContext } from "../contexts/ContextProvider";

const Products = () => {
  const { message } = useStateContext();

  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <>
      <div className="w-full p-5">
        {modal && <ModalProduct closeModal={closeModal} />}
        <div className="p-5">
          <h1 className="text-3xl ">Semua Produk</h1>
          <Link onClick={openModal} className="btn btn-primary  mt-5">
            Tambah product
          </Link>
        </div>
        <div className="w-2/3 border my-5 shadow-lg">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama product</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>1</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>

                  <td>Purple</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
