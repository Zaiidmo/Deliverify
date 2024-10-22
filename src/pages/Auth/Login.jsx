import React from "react";
import { LoginForm } from "../../components/LoginForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <LoginForm />
    </>
  );
};

export default Login;