import React, { useState, useContext, createContext } from "react";
import { authorize, register } from "../services/auth";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState();

  const signin = (email, password, name) => {
    authorize(email, password, name).then((response) => {
      setUser(response.user);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
    });
  };
  const signup = (email, password) => {
    register(email, password).then((response) => {
      setUser(response.user);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
    });
  };

  // SignOut functionality will be done in the next sprint

  // const signout = () => {
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   logout(refreshToken).then(() => {
  //     localStorage.removeItem("refreshToken");
  //     localStorage.removeItem("accessToken");

  //     setUser({});
  //   });
  // };

  // const sendPasswordResetEmail = (email) => {};
  // const confirmPasswordReset = (code, password) => {};

  return {
    user,
    signin,
    signup,
    // signout,
    // sendPasswordResetEmail,
    // confirmPasswordReset,
  };
}
