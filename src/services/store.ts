import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  ingredientsReducer,
  userReducer,
  ordersReducer,
  burgerConstructorReducer,
  orderReducer,
  feedsReducer,
  orderInfoReducer
} from '@slices';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,
  orderInfo: orderInfoReducer,
  feeds: feedsReducer,
  orders: ordersReducer,

  burgerConstructor: burgerConstructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch: () => AppDispatch = () => dispatchHook();

export default store;
