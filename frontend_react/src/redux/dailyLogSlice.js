import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Fetch Daily Intake (calories + restricted products)
export const fetchDailyIntake = createAsyncThunk(
  'dailyLog/fetchDailyIntake',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/daily-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Async Thunk pentru obținerea datelor zilnice
export const fetchDailyLog = createAsyncThunk(
  'dailyLog/fetchData',
  async (date, { dispatch }) => {
    try {
      const response = await axios.get(`/api/dailylog/${date}`);
      const { kcal, consumed, left, restrictedProducts } = response.data;

      // Returnează datele pentru a actualiza Redux
      return { kcal, consumed, left, restrictedProducts };
    } catch (error) {
      console.error('Error fetching daily log:', error);
      throw error;
    }
  }
);

const dailyLogSlice = createSlice({
  name: 'dailyLog',
  initialState: {
    kcal: 0,
    consumed: 0,
    left: 0,
    restrictedProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDailyIntake.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyIntake.fulfilled, (state, action) => {
        state.kcal = action.payload.kcal;
        state.restrictedProducts = action.payload.restrictedProducts;
        state.loading = false;
      })
      .addCase(fetchDailyIntake.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDailyLog.fulfilled, (state, action) => {
        const { kcal, consumed, left, restrictedProducts } = action.payload;
        state.kcal = kcal;
        state.consumed = consumed;
        state.left = left;
        state.restrictedProducts = restrictedProducts;
      });
  },
});

export default dailyLogSlice.reducer;
