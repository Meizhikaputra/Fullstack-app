import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatToRupiah, getProductsId } from "../api/productApi";
const EditProduct = () => {
  const [loading, setLoding] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const [price, setPrice] = useState();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const [product, setProduct] = useState();

  const [imageUrl, setImageUrl] = useState();
  const [eName, setEName] = useState();
  const [eDescription, setEDescription] = useState();
  const [ePrice, setEPrice] = useState();
  const { id } = useParams();

  useEffect(() => {
    axiosClient.get(`/products/${id}`).then((res) => {
      setProduct(res.data.data);
      setLoding(false);
    });
  }, []);

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

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("price", priceRef.current.value);
    if (image) {
      formData.append("image", image);
    }

    axiosClient
      .post("/products/" + id, formData, {
        headers: {
          "X-HTTP-Method-Override": "PUT",
        },
      })
      .then(async (res) => {
        if (res.status === 204) {
          enqueueSnackbar("Anda tidak mengubah apapun", {
            variant: "warning",
          });
        } else {
          enqueueSnackbar("Berhasil mengubah data produk", {
            variant: "success",
          });
          navigate("/products");
        }
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

  if (loading) {
    return <div className="">loading...</div>;
  }
  return (
    <>
      <div className="w-full ">
        <h1 className="text-3xl text-center my-5">Halaman edit produk</h1>
        <div className="w-1/2 border border-black rounded-lg flex justify-center h-full p-5 my-10">
          <form
            onSubmit={handleSubmit}
            className=" w-full mx-9"
            encType="multipart/form-data"
          >
            <label className="form-control w-full max-w-lg">
              <div className="label">
                {eName && (
                  <span className="label-text text-red-500">{eName}</span>
                )}
              </div>
              <h2>Name</h2>
              <input
                type="text"
                placeholder="Nama Product"
                className="input input-bordered input-primary w-full max-w-xl "
                name="name"
                defaultValue={product.name}
                ref={nameRef}
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
              <h2>Deskripsi</h2>
              <input
                type="text"
                placeholder="Deskripsi"
                className="input input-bordered input-primary w-full max-w-xl "
                name="description"
                defaultValue={product.description}
                ref={descriptionRef}
              />
            </label>
            <label className="form-control w-full max-w-lg ">
              <div className="flex w-full">
                <h2>Harga</h2>
                <div className="label">
                  {ePrice && (
                    <span className="label-text text-red-500">{ePrice}</span>
                  )}
                </div>
                {price ? (
                  <div className="label">
                    <span className="label-text text-red-500">{price}</span>
                  </div>
                ) : (
                  <div className="label w-full">
                    <span className="label-text text-red-500 ">
                      {formatToRupiah(product.price)}
                    </span>
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="Harga Product"
                className="input input-bordered input-primary w-full max-w-xl "
                name="price"
                defaultValue={product.price}
                ref={priceRef}
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
            {!imageUrl && (
              <div className="my-5">
                <p>Image Preview:</p>
                <img
                  src={product.image}
                  alt="Selected"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              ref={imageRef}
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
    </>
  );
};

export default EditProduct;
