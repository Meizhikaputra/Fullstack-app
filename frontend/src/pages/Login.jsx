import { useRef, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
  const { setUser, setToken, message } = useStateContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [gagal, setGagal] = useState(null);
  const [emailE, setEmailE] = useState();
  const [passwordE, setPasswordE] = useState();

  function onSubmit(ev) {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then((response) => {
        console.log(response.data.user);
        const data = response.data;
        if (data) {
          setUser(data.user);
          setToken(data.token);
        }
        setGagal(response.data);
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setEmailE(response.data.errors.email[0]);
          setPasswordE(response.data.errors.password[0]);
        }
      });
  }

  return (
    <div className=" flex h-screen w-full items-center ">
      <div className="max-w-lg mx-auto w-full p-4 bg-white shadow-lg rounded-md border">
        {message && (
          <div role="alert" className="alert alert-success my-3">
            <span className="text-white">{message}</span>
          </div>
        )}
        <h2 className="text-center text-2xl font-bold">Login</h2>
        {gagal && (
          <div role="alert" className="alert alert-error my-3">
            <span className="text-white">{gagal.msg}</span>
          </div>
        )}

        {emailE && (
          <div className="bg-red-500 text-white p-4 my-3 rounded-lg">
            <h3 className="block">{emailE}</h3>
            {passwordE && <h3>{passwordE}</h3>}
          </div>
        )}

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <br />
            <input
              type="email"
              ref={emailRef}
              id="email"
              className="input input-bordered input-secondary w-full max-w-lg"
              placeholder="Masukkan email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Kata Sandi
            </label>
            <br />
            <input
              type="password"
              ref={passwordRef}
              id="password"
              className="input input-bordered input-secondary w-full max-w-lg"
              placeholder="Masukkan kata sandi"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
