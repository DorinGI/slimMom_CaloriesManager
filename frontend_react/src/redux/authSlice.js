import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/login', async userData => {
  const response = await axios.post(
    'http://localhost:5000/api/auth/login',
    userData
  );
  return response.data;
});

export const registerUser = createAsyncThunk(
  'auth/register',
  async userData => {
    const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      userData
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isLoading: false, error: null },
  reducers: {
    logout: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
