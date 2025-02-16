import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

const dailyLogSlice = createSlice({
  name: 'dailyLog',
  initialState: {
    kcal: null,
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
      });
  },
});

export default dailyLogSlice.reducer;
