import { useRef, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useStateContext } from "../../contexts/ContextProvider";
import { useSnackbar } from "notistack";
import { formatToRupiah, getProducts } from "../../api/productApi";

const ModalProduct = ({ closeModal, setProducts }) => {
  const { setMessage } = useStateContext();

  const [price, setPrice] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [eName, setEName] = useState();
  const [eDescription, setEDescription] = useState();
  const [ePrice, setEPrice] = useState();

  const handleFileChange = (ev) => {
    const file = ev.target.files[0];
    setImage(file);

    if (file) {
      const preview = URL.createObjectURL(file);
      setImageUrl(preview);
    } else {
      setImageUrl(null);
    }
  };

  const handlePrice = (ev) => {
    setPrice(formatToRupiah(ev.target.value));
    console.log(price);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      image: image,
    };
    axiosClient
      .post("/products", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        console.log(res);
        setMessage(res.data.msg);
        closeModal();
        enqueueSnackbar("Berhasil Menambahkan Produk Baru", {
          variant: "success",
        });
        const data = await getProducts();
        setProducts(data);
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setEName(response.data.errors.name[0]);
          setEDescription(response.data.errors.description[0]);
          setEPrice(response.data.errors.price[0]);
        }
      });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div className="modal modal-open">
        <div
          className="modal-box true w-1/2"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
          <h2 className="text-lg font-bold">Add New Product</h2>
          <p className="py-4">Silahkan masukan data produk baru!</p>
          <div className="modal-action w-full">
            <form
              onSubmit={handleSubmit}
              className=" w-full"
              encType="multipart/form-data"
            >
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  {eName && (
                    <span className="label-text text-red-500">{eName}</span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Nama Product"
                  className="input input-bordered input-primary w-full max-w-xl "
                  ref={nameRef}
                  name="name"
                />
              </label>
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  {eDescription && (
                    <span className="label-text text-red-500">
                      {eDescription}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Deskripsi"
                  className="input input-bordered input-primary w-full max-w-xl "
                  ref={descriptionRef}
                  name="description"
                />
              </label>
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  {ePrice && (
                    <span className="label-text text-red-500">{ePrice}</span>
                  )}
                </div>
                <div className="label">
                  {price && (
                    <span className="label-text text-red-500">{price}</span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="harga"
                  className="input input-bordered input-primary w-full max-w-xl "
                  ref={priceRef}
                  onChange={(ev) => handlePrice(ev)}
                  name="name"
                />
              </label>

              {imageUrl && (
                <div className="my-5">
                  <p>Image Preview:</p>
                  <img
                    src={imageUrl}
                    alt="Selected"
                    style={{ width: "200px", height: "auto" }}
                  />
                </div>
              )}
              <input
                type="file"
                ref={imageRef}
                onChange={handleFileChange}
                className="file-input file-input-bordered file-input-secondary w-full max-w-xl my-5"
              />
              <br />
              <button
                className="inline-block border border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500
                hover:text-white font-bold py-2 px-4 rounded mt-3"
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProduct;
