// src/redux/userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "./userApi";

// Thunk to handle asynchronous API call
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const data = await getUserProfile(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profileData: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.profileData = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
