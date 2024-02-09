import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Register.css';
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField } from '@mui/material';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  
  const handleSuccessDialogClose = () => {
    setOpenSuccessDialog(false);
    navigate('/login'); 
  };

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const userData = { firstName, lastName, email, password };
    console.log('registering', firstName, lastName, email)
    axios.post('http://localhost:8080/register', {
      email,
      password, 
      firstName,
      lastName
    }).then((r =>{
      console.log('response data ', r.data);
      setOpenSuccessDialog(true);
      navigate('/login'); 
    })).catch(e => {
      console.error('error creating trip', e);
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Register</button>
      </form>
      {/* <Dialog open={openSuccessDialog} onClose={handleSuccessDialogClose}>
        <DialogTitle>Registration Successful!</DialogTitle>
        <DialogContent>
          <Typography>
            Thank you for registering. You can now log in with your credentials.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default Register;



