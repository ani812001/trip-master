
import React from 'react';
import { Box, Typography } from "@mui/material";

const TripDetails = ({ trip }) => {
  return (
    <div className="modal-content">
      <h2>{trip.heading}</h2>
      <p>{trip.text}</p>
      <h3>Additional Details:</h3>
      <Box>
        {trip.additionalDetails.map((detail, index) => (
          <Typography key={index} variant="body2">{detail}</Typography>
        ))}
      </Box>
    </div>
  );
};

export default TripDetails;

