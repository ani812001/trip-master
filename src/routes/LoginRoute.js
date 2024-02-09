// Login.js
import React from 'react';
import Hero from "../component/Hero";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Login from "../component/Login"; // You might need to create LoginForm.js
import {UserProvider} from "../component/UserContext"; // You might need to create LoginForm.js


function LoginRoute() {
  return (
    <>
      <Navbar/>
      <Login />
      </>
  );
}

export default LoginRoute;
