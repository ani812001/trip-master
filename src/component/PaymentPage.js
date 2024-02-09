import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const [cardNo, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [fullName, setFullName] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const location = useLocation();
  const { bookingId } = location.state || {};
  const navigate = useNavigate();

  console.log('booking id', bookingId)
  const handlePayment = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/payment', {
      bookingId,
      cardNo,
      cvv,
      fullName,
      expiryDate,
    }).then((r) => {
      console.log('response ', r.status);
      console.log('response data ', r.data);
      setBookingSuccess(true);
      // Show pop-up message
      window.alert('Payment Successful!\nBooking ID: ' + r.data.id);
      // You can also use a modal library for a more sophisticated pop-up
      navigate('/payment', { state: { bookingId: r.data.id } });
    }).catch(e => {
      console.error('error creating trip', e);
    });
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <form onSubmit={handlePayment}>
        <label>
          Card Number:
          <input
            type="text"
            value={cardNo}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="16"
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            maxLength="5"
          />
        </label>
        <label>
          CVV:
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            maxLength="3"
          />
        </label>
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default PaymentPage;
