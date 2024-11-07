import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import resumeReducer from './Resume/resumeSlice';
import userReducer from './Users/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    user: userReducer
  },
});

export default store;
