
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Service from "./routes/Service";
import PaymentPage from "./component/PaymentPage";
import BookingDetails from "./component/BookingDetail";
import SuccessPage from "./component/SuccessPage";
import LoginRoute from "./routes/LoginRoute";
import TripData from './component/Trip';
import Register from './component/Register';
import Login from './component/Login';
import TripDetails from './component/TripDetails';
import { UserProvider } from './component/UserContext';

export default function App() {
  const handleRegister = (userData) => {
    // Handle registration logic here
    console.log('Registered:', userData);
  };

  const handleLogin = (loginData) => {
    // Handle login logic here
    console.log('Logged in:', loginData);
  };

  return (
   
    <div className="App">
      <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/booking" element={<BookingDetails />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      </UserProvider>
    </div>
  );
}
