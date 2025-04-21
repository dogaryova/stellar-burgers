import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  userReducer,
  ordersReducer,
  ingredientsReducer,
  burgerConstructorReducer,
  orderReducer,
  feedsReducer,
  orderInfoReducer
} from '@slices';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  feeds: feedsReducer,
  orders: ordersReducer,
  ingredients: ingredientsReducer,

  user: userReducer,

  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  orderInfo: orderInfoReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();

export default store;
