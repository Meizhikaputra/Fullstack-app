import { useRef, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
  const { setUser, setToken } = useStateContext();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [gagal, setGagal] = useState(null);
  const [nameE, setNameE] = useState();
  const [emailE, setEmailE] = useState();
  const [passwordE, setPasswordE] = useState();
  console.log(nameE, emailE, passwordE);

  function onSubmit(ev) {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(payload);

    // const data = await login(credentials);
    // setToken(data.token);
    axiosClient
      .post("/register", payload)
      .then((response) => {
        const data = response.data;
        if (data) {
          setUser(data.user);
          setToken(data.token);
        }
        setGagal(data);
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setEmailE(response.data.errors.email[0]);
          setPasswordE(response.data.errors.password[0]);
          setNameE(response.data.errors.name[0]);
        }
      });
  }

  return (
    <div className=" flex min-h-screen w-full items-center">
      <div className="max-w-lg mx-auto w-full p-4 bg-white shadow-lg rounded-md border">
        <h2 className="text-center text-2xl font-bold">Daftar</h2>
        {gagal && (
          <div role="alert" className="alert alert-error my-3">
            <span className="text-white">{gagal.msg}</span>
          </div>
        )}
        <form className="mt-4" onSubmit={onSubmit}>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              {nameE && (
                <span className="label-text text-red-500">{nameE}</span>
              )}
            </div>
            <input
              type="text"
              ref={nameRef}
              placeholder="Masukan Nama Lengkap"
              className="input input-bordered input-secondary w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              {emailE && (
                <span className="label-text text-red-500">{emailE}</span>
              )}
            </div>
            <input
              type="email"
              ref={emailRef}
              placeholder="Masukan Email Anda"
              className="input input-bordered input-secondary w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              {passwordE && (
                <span className="label-text text-red-500">{passwordE}</span>
              )}
            </div>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Masukan Password"
              className="input input-bordered input-secondary w-full max-w-lg"
            />
          </label>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
