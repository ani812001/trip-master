// TripList.js

import React from 'react';
import Trip from './TripService';

const TripList = ({ trips }) => {
  return (
    <div className="trip-list">
      {trips.map((trip) => (
        <Trip key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
