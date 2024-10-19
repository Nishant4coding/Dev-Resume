// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { login, signup } from './authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

// Thunk to handle login
// src/store/Auth/authSlice.js
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const userData = await login(credentials);
    dispatch(loginSuccess(userData));
    
    // Store token in local storage
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }

    return { payload: { success: true, ...userData } }; 
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { payload: { success: false, message: error.message } }; 
  }
};


export const signupUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await signup(userData);
    dispatch(loginSuccess(response));

    return { payload: { success: true, ...response } }; 
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { payload: { success: false, message: error.message } }; 
  }
};


export default authSlice.reducer;
