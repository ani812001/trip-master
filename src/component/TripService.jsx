import "./TripStyles.css";
import Trip1Image from "../assets/6.jpg";
import Trip2Image from "../assets/7.jpg";
import Trip3Image from "../assets/8.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Container, Modal, Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useUser } from "./UserContext";

function TripService() {
  const cityToTripImageMap = {
    City1: Trip1Image,
    City2: Trip2Image,
    City3: Trip3Image,
  };

  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    numberOfPeople: 1,
    startDate: new Date(),
    endDate: new Date(),
  });

  const [otp, setOtp] = useState('');

  const { userEmail } = useUser();
  console.log("email in trip", userEmail);

  useEffect(() => {
    const apiEndpoint = "http://localhost:8080/tours";
    axios
      .get(apiEndpoint)
      .then((response) => {
        console.log(response.data);
        setTrips(response.data);
      })
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  const handleOpenModal = (trip) => {
    setSelectedTrip(trip);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTrip(null);
    setFormData({
      fullName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      numberOfPeople: 1,
      startDate: new Date(),
      endDate: new Date(),
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStartDateChange = (date) => {
    setFormData({
      ...formData,
      startDate: date,
    });
  };

  const handleEndDateChange = (date) => {
    setFormData({
      ...formData,
      endDate: date,
    });
  };

  const handleBookNow = (event) => {
    event.preventDefault();
    // Handle booking logic here
    console.log("Booking details submitted", formData);
    // Generate OTP
    generateOtp();
  };

  const generateOtp = () => {
    // Simulating OTP generation here
    const generatedOtp = Math.floor(1000 + Math.random() * 9000);
    setOtp(generatedOtp.toString());
    setOtpDialogOpen(true);
  };

  const handleVerifyOtp = () => {
    // Here you can add OTP verification logic.
    // For this example, we'll just close the OTP dialog.
    setOtpDialogOpen(false);
    // Handle booking completion
    console.log("Booking completed successfully");
    handleCloseModal();
  };

  return (
    <Container className="trip">
      <Typography variant="h2" component="h1" className="trip-title">
        Trips To Explore
      </Typography>
      <Grid container spacing={4} className="tripcard">
        {trips.map((trip) => (
          <Grid item xs={12} sm={6} md={4} key={trip.id}>
            <Box className="t-card" onClick={() => handleOpenModal(trip)}>
              <div className="t-image">
                <img src={cityToTripImageMap[trip.image]} alt={trip.heading} />
              </div>
              <div className="t-card-content">
                <Typography variant="h5" component="h4">
                  {trip.heading}
                </Typography>
                <Typography variant="body2" component="p">
                  {trip.text}
                </Typography>
                {trip.label && (
                  <div className="t-card-label">{trip.label}</div>
                )}
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
      
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          {selectedTrip && (
            <>
              <Typography variant="h4" component="h2" className="modal-title">
                {selectedTrip.heading}
              </Typography>
              <Typography variant="body1" component="p" className="modal-description">
                {selectedTrip.text}
              </Typography>
              <Box className="booking-details">
                <Typography variant="h5" component="h3">
                  Booking Details
                </Typography>
                <form className="booking-form" onSubmit={handleBookNow}>
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                  />
                  <TextField
                    label="Number of People"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    select
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleFormChange}
                  >
                    {[...Array(10).keys()].map((number) => (
                      <MenuItem key={number + 1} value={number + 1}>
                        {number + 1}
                      </MenuItem>
                    ))}
                  </TextField>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={formData.startDate}
                      onChange={handleStartDateChange}
                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="End Date"
                      value={formData.endDate}
                      onChange={handleEndDateChange}
                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                    />
                  </LocalizationProvider>
                </form>
              </Box>
              <Box className="payment-details">
                <Typography variant="h5" component="h3">
                  Payment Details
                </Typography>
                <form className="payment-form">
                  <TextField
                    label="Card Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleFormChange}
                  />
                  <TextField
                    label="Expiry Date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleFormChange}
                  />
                  <TextField
                    label="CVV"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleFormChange}
                  />
                </form>
              </Box>
              <Button onClick={handleCloseModal} color="secondary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleBookNow} className="book-now-button">
                Book Now
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* OTP Dialog */}
      <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <Typography>Please enter the OTP sent to your mobile number or email.</Typography>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOtpDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleVerifyOtp} color="primary">
            Verify OTP
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TripService;


