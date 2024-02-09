import React, { useState } from 'react';
import "./TripStyles.css";
import TripDetailsModal from './TripDetailsModal.js';
import BookingDetail from './BookingDetail';
import { Box, Typography , Button } from "@mui/material";

const Trip = ({ tourId, image, heading, text, additionalDetails, label }) => {

  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const handleBookNow = () => {
    setIsBookingFormOpen(!isBookingFormOpen);
  };

  const handleLabelClick = () => {
    console.log(`Label button clicked for ${heading}`);
  };


  return (
    <div className="trip-card">
      <img src={image} alt={heading}  />

      <Typography variant="h1">{heading}</Typography>
      <Typography variant="body1">{text}</Typography>


      <Typography variant="h3">Additional Details:</Typography>

      <Button variant="contained" color="primary" onClick={handleBookNow}>
      Detail
      </Button>
      {isBookingFormOpen && <BookingDetail  name='aniket' tourId= {tourId} onClose={() => setIsBookingFormOpen(false)} />}

      {/* Label button */}
      <Button variant="outlined" color="secondary" onClick={handleLabelClick}>
        {label} Details
      </Button>
    </div>
  );
};

// function TripData(props) {
//   const { tripId, details, additionalDetails, heading, text, label, image } = props;
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleTrip = () => {
//     setIsBookingFormOpen(!isBookingFormOpen);
//   };

//   return (
//     <div className="t-card">
//       <div className="t-image">
//         <img src={image} alt="image" />
//       </div>
//       <h4>{heading}</h4>
//       <p>{text}</p>
      
//       {isBookingFormOpen ? (
//         // Render the booking form here
//         <BookingDetail onClose={handleTrip} />
//       ) : (
//         // Render the "Book Now" button here
//         <button className="booking-button" onClick={handleTrip}>
//           Book Now
//         </button>
//       )}
      
//       <button onClick={openModal}>{label}</button>

//       {isModalOpen && (
//         <TripDetailsModal
//           tripId={tripId}
//           heading={heading}
//           text={text}
//           additionalDetails={additionalDetails}
//           details={details}
//           closeModal={closeModal}
//         />
//       )}
//     </div>
//   );
// }

export default Trip;



