import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TInitState = {
  error: string | null;
  ingredients: TIngredient[];
  isLoading: boolean;
};

const initialState: TInitState = {
  isLoading: false,

  ingredients: [],
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

const burgerContentSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    burgerIngredientsSelector: (state) => state.ingredients,
    burgerLoadSelector: (state) => state.isLoading,

    burgerErrorS: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось загрузить ингредиенты';
      })

      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientsReducer = burgerContentSlice.reducer;
export const { burgerLoadSelector, burgerIngredientsSelector, burgerErrorS } =
  burgerContentSlice.selectors;
