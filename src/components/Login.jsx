// src/components/Login.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../store/Auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    dispatch(loginRequest());
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      dispatch(loginSuccess(data));
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div>
      {/* Render login form */}
      {loading ? 'Logging in...' : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default Login;
