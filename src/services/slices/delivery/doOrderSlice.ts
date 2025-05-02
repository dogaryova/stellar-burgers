import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  orderModalData: TOrder | null;
  lastOrderName: string;
  orderAccept: boolean;
  error: string | null;
  orderRequest: boolean;

  isLoading: boolean;
};

const initialState: TInitialState = {
  orderRequest: false,

  lastOrderName: '',
  isLoading: false,
  error: null,
  orderModalData: null,
  orderAccept: false
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

const doOrderSlice = createSlice({
  name: 'makeOrder',
  initialState,
  reducers: {
    handleCloseOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderConfirmation: (state) => state.orderAccept,
    selectOrderError: (state) => state.error,
    selectIsOrderLoading: (state) => state.isLoading,
    getOrderRequest: (state) => state.orderRequest,

    getOrderModalInfo: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;

        state.lastOrderName = action.payload.name;
        state.error = null;
        state.orderAccept = true;
        state.orderModalData = action.payload.order;
        state.isLoading = false;
      })
      .addCase(orderBurger.pending, (state) => {
        state.orderAccept = false;
        state.error = null;
        state.isLoading = true;

        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось сделать заказ';
        state.isLoading = false;
      });
  }
});
export const { handleCloseOrderModal } = doOrderSlice.actions;

export const {
  getOrderConfirmation,
  getOrderModalInfo,
  getOrderRequest,
  selectOrderError,

  selectIsOrderLoading
} = doOrderSlice.selectors;

export const orderReducer = doOrderSlice.reducer;
