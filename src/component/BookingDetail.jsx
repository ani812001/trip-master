import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './BookingDetail.css'; 
import axios from 'axios';
import PaymentPage from './PaymentPage';
import { useUser } from './UserContext';

const BookingDetail = ({tourId, name}) => {
  // const [tourId, setTourId] = useState(''); 
  

  const [refUserId, setRefUserId] = useState(''); 
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [noOfTravellers, setNoOfTravellers] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userEmail } = useUser();
  const paymentId = '123';

  console.log('values from parent tourid , email, name', tourId, userEmail,  name)
  

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Make an API call to book the trip
       axios.post('http://localhost:8080/book', {
        tourId,
        refUserId, 
        name,
        email:userEmail,
        startDate: startDate,
        noOfTravellers,
        phoneNumber: phoneNumber,
      }).then((r =>{
        console.log('response ', r.status);
        console.log('response data ', r.data);
        setBookingSuccess(true);
        navigate('/payment', { state: { bookingId:r.data.id } }); 
      })).catch(e => {
        console.error('error creating trip', e);
      });

    } catch (error) {
      console.error('Booking error:', error);
      setBookingError('wrong credential');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <h2 className="booking-heading">Book Your Trip</h2>
      <form onSubmit={handleBooking} className="booking-form">
        <label className="booking-label">
          Tour ID:
          <input
            type="text"
            value={tourId}
            required
            className="booking-input"
          />
        </label>

        <label className="booking-label">
          Email:
          <input
            type="email"
            value={userEmail}
            required
            className="booking-input"
          />
        </label>

        <label className="booking-label">
  Start Date:
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    min={new Date().toISOString().split('T')[0]}
    required
    className="booking-input"
  />
</label>
        <label className="booking-label">
          Number of Travellers:
          <input
            type="number"
            value={noOfTravellers}
            onChange={(e) => setNoOfTravellers(e.target.value)}
            required
            className="booking-input"
          />
        </label>

        <label className="booking-label">
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="booking-input"
          />
        </label>

        <button type="submit" className="booking-button" disabled={loading}>
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </form>

      {bookingError && <div className="error-message">{bookingError}</div>}

      {bookingSuccess && (
        <div className="success-message">
          Booking successful! Redirecting...
        </div>
      )}
    </div>
  );
};

export default BookingDetail;
