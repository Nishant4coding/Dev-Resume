// src/store/resumeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchResume, updateResume } from './resumeApi';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resume: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchResumeRequest: (state) => {
      state.loading = true;
    },
    fetchResumeSuccess: (state, action) => {
      state.loading = false;
      state.resume = action.payload;
    },
    fetchResumeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateResumeRequest: (state) => {
      state.loading = true;
    },
    updateResumeSuccess: (state, action) => {
      state.loading = false;
      state.resume = action.payload;
    },
    updateResumeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchResumeRequest,
  fetchResumeSuccess,
  fetchResumeFailure,
  updateResumeRequest,
  updateResumeSuccess,
  updateResumeFailure,
} = resumeSlice.actions;

// Thunk to fetch resume
export const loadResume = () => async (dispatch) => {
  dispatch(fetchResumeRequest());
  try {
    const resumeData = await fetchResume();
    dispatch(fetchResumeSuccess(resumeData));
  } catch (error) {
    dispatch(fetchResumeFailure(error.message));
  }
};

// Thunk to update resume
export const saveResume = (resumeData) => async (dispatch) => {
  dispatch(updateResumeRequest());
  try {
    const updatedResume = await updateResume(resumeData);
    dispatch(updateResumeSuccess(updatedResume));
  } catch (error) {
    dispatch(updateResumeFailure(error.message));
  }
};

export default resumeSlice.reducer;
