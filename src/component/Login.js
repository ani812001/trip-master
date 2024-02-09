import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from 'axios';
import {useUser} from './UserContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { updateUserEmail } = useUser();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const savedCredentials = localStorage.getItem('savedCredentials');
    
    if (savedCredentials) {
      const { email, password } = JSON.parse(savedCredentials);
      setEmail(email);
      setPassword(password);
      setRememberMe(true);

    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log('calling login')

      const response = await axios.post('http://localhost:8080/login', {
        email: email,
        password: password,
      });
      console.log('called login')
      updateUserEmail(email);
      setLoginSuccess(true);

      if (rememberMe) {
        localStorage.setItem(
          'savedCredentials',
          JSON.stringify({ email, password })
        );
      } else {
        localStorage.removeItem('savedCredentials');
      }

      navigate('/service', { state: { email } });
    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.status === 401) {
        setLoginError('Incorrect email or password');
        setEmailError(true);
        setPasswordError(true);
      } else {
        setLoginError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const redirectToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login to Trippy</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label className="login-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
            required
            className={`login-input ${emailError ? 'error' : ''}`}
          />
        </label>

        <label className="login-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            required
            className={`login-input ${passwordError ? 'error' : ''}`}
          />
        </label>

        <label className="login-label">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember Me
        </label>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <button
        type="button"
        className="register-button"
        onClick={redirectToRegister}
      >
        Register
      </button>

      {loginError && <div className="error-message">{loginError}</div>}

      {loginSuccess && (
        <div className="success-message">
          Login successful! Redirecting...
        </div>
      )}
    </div>
  );
};

export default Login;
