import { createSlice } from '@reduxjs/toolkit';

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    products: [], // Stores eaten products per day
  },
  reducers: {
    addProductToDiary: (state, action) => {
      state.products.push(action.payload);
    },
    removeProductFromDiary: (state, action) => {
      state.products = state.products.filter(
        product =>
          !(
            product.product === action.payload.product &&
            product.date === action.payload.date
          )
      );
    },
  },
});

export const { addProductToDiary, removeProductFromDiary } = diarySlice.actions;
export default diarySlice.reducer;
