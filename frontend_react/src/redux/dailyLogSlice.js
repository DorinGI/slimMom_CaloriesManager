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

export const fetchDailyIntakeUser = createAsyncThunk(
  'dailyLog/fetchDailyIntakeUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/daily-intake-user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(userData),
        }
      );
      console.log('PostBody', userData);

      if (!response.ok) {
        throw new Error('Failed to fetch user intake data');
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
  async (date, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/dailylog/${date}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const products = Array.isArray(response.data) ? response.data : [];
      // 🔹 Calculează totalul caloriilor consumate
      const consumed = products.reduce(
        (total, product) => total + product.calories,
        0
      );

      // 🔹 Ia `kcal` (rata zilnică) din Redux state
      const { kcal } = getState().dailyLog;

      // 🔹 Calculează caloriile rămase
      const left = kcal - consumed;

      return { kcal, consumed, left, products }; // Returnăm datele pentru Redux
    } catch (error) {
      console.error('Error fetching daily log:', error);
      return rejectWithValue(error.message);
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
    products: [],
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
        state.left = action.payload.kcal - state.consumed;
        state.loading = false;
      })
      .addCase(fetchDailyIntake.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDailyIntakeUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyIntakeUser.fulfilled, (state, action) => {
        state.kcal = action.payload.kcal;
        state.restrictedProducts = action.payload.restrictedProducts || [];
        state.left = action.payload.kcal - state.consumed;
        state.loading = false;
      })
      .addCase(fetchDailyIntakeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDailyLog.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyLog.fulfilled, (state, action) => {
        state.consumed = action.payload.consumed;
        state.left = action.payload.left;
        state.products = action.payload.products;
        state.loading = false;
      })
      .addCase(fetchDailyLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dailyLogSlice.reducer;
