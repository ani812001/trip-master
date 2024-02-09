import Trip from "./Trip";
import "./TripStyles.css";
import Trip1Image from "../assets/6.jpg"
import Trip2Image from "../assets/7.jpg"
import Trip3Image from "../assets/8.jpg"
import axios from "axios";
import { useEffect, useState } from "react";
import TripList from "./TripList";
import { Box, Grid, Typography } from "@mui/material";
import {useUser} from './UserContext'

function TripService() {
  
    const cityToTripImageMap = {
        City1: Trip1Image,
        City2: Trip2Image,
        City3: Trip3Image,
      };

    const [trips, setTrips] = useState([]);
    const { userEmail } = useUser();
    console.log('email in trip', userEmail)
  
    useEffect(() => {
      const apiEndpoint = 'http://localhost:8080/tours';
      axios.get(apiEndpoint)
        .then(response => {
            console.log(response.data)
            setTrips(response.data)
        })
        .catch(error => console.error('Error fetching trips:', error));
    }, []);
  
    return (
      <div className="trip">
        <h1>Trips To Explore</h1>
        <div className="tripcard">
           {
           trips.map(trip => (
            <Box>
            <Trip
              email={userEmail}
              key={trip.id} // Assuming tripId is a unique identifier
              tourId={trip.id}
              image= {cityToTripImageMap[trip.image]}
              heading={trip.heading}
              text={trip.text}
              label={trip.label}
            />
            </Box>
          ))}
        </div>
      </div>
    );
  }
 

export default TripService;

