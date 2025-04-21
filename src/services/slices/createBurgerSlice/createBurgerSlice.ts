import { TConstructorIngredient, TIngredient } from '../../../utils/types';
import { createSlice, nanoid } from '@reduxjs/toolkit';
export interface BurgerConstructorState {
  ingredients: TConstructorIngredient[];

  bun: TConstructorIngredient | null;
}

const initialState: BurgerConstructorState = {
  ingredients: [],

  bun: null
};

export const createBurgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: {
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return {
          payload: { ...ingredient, id },
          error: null,
          meta: null
        };
      },
      reducer: (state, action) => {
        const type = action.payload.type;
        if (type !== 'bun') {
          state.ingredients.push(action.payload);
        } else {
          state.bun = action.payload;
        }
      }
    },
    downItem: (state, action) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },

    upItem: (state, action) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > 0) {
        [state.ingredients[index - 1], state.ingredients[index]] = [
          state.ingredients[index],
          state.ingredients[index - 1]
        ];
      }
    },
    clearItem: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
    deleteItem: (state, action) => {
      if (action.payload.type !== 'bun') {
        state.ingredients = state.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.bun = null;
      }
    }
  },
  selectors: {
    itemSelect: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    })
  }
});

export const { upItem, downItem, clearItem, addItem, deleteItem } =
  createBurgerSlice.actions;

export const { itemSelect } = createBurgerSlice.selectors;

export const burgerConstructorReducer = createBurgerSlice.reducer;
