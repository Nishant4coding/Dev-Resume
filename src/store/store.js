// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import resumeReducer from './Resume/resumeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
  },
});

export default store;
