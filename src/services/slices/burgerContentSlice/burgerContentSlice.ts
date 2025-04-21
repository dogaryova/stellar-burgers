import { getIngredientsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TInitialState = {
  error: string | null;

  isLoading: boolean;

  ingredients: TIngredient[];
};

const initialState: TInitialState = {
  error: null,

  ingredients: [],

  isLoading: false
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

      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error =
          action.error.message || 'Не удалось загрузить ингредиенты';
        state.isLoading = false;
      })

      .addCase(fetchIngredients.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      });
  }
});

export const ingredientsReducer = burgerContentSlice.reducer;
export const { burgerErrorS, burgerLoadSelector, burgerIngredientsSelector } =
  burgerContentSlice.selectors;
