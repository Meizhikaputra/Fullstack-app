import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  message: null,
  setUser: () => {},
  setToken: () => {},
  setMessage: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [message, setMessage] = useState(null);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setToken,
        setUser,
        message,
        setMessage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext); // Use context directly
  if (!context) {
    throw new Error("useStateContext must be used within ContextProvider");
  }
  return context; // Return the entire context object
};
