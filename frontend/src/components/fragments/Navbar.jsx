import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../api/axiosClient";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { token, setToken, setUser, setMessage, cartOpen, setCartOpen } =
    useStateContext();

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then((response) => {
      const msg = response.data.msg;
      setToken(null);
      setMessage(msg);
      setUser({});
    });
  };

  return (
    <div className="navbar fixed bg-fuchsia-700 px-8 z-50 top-0">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">daisyUI</a>
      </div>
      {token ? (
        <div className="">
          <div className="flex text-white mx-16  text-lg ">
            <Link to={"/homepage"} className="mx-5 bold">
              Homepage
            </Link>
            <Link to={"/products"} className="mx-5">
              Products
            </Link>
            <Link to={"/dashboard"} className="mx-5">
              Dashboard
            </Link>
            <Link to={"/user"} className="mx-5">
              Profile
            </Link>
            <div
              className="relative mx-5"
              onClick={() => setCartOpen((open) => !open)}
            >
              <FaShoppingCart size={24} className="cursor-pointer" />
              <span className="w-5 text-xs  bg-red-500 text-white rounded-full px-2 py-1 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                1
              </span>
            </div>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link to={"/homepage"} className="mx-5">
                  Homepage
                </Link>
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <Link onClick={onLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex text-white mx-8  text-lg ">
          <Link to={"/homepage"} className="mx-5">
            Homepage
          </Link>
          <Link to={"/signup"} className="mx-5">
            SignUp
          </Link>
          <Link to={"/login"} className="mx-5  bold">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
