import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TInitlState = {
  lastOrderName: string;
  orderAccept: boolean;
  error: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
};

const initialState: TInitlState = {
  lastOrderName: '',
  isLoading: false,
  error: null,
  orderAccept: false,
  orderRequest: false,
  orderModalData: null
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
    selectIsOrderLoading: (state) => state.isLoading,
    getOrderConfirmation: (state) => state.orderAccept,
    selectOrderError: (state) => state.error,
    getOrderRequest: (state) => state.orderRequest,

    getOrderModalInfo: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder

      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
        state.orderAccept = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.lastOrderName = action.payload.name;
        state.error = null;

        state.orderAccept = true;
        state.orderModalData = action.payload.order;
        state.isLoading = false;
        state.orderRequest = false;
      })

      .addCase(orderBurger.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось сделать заказ';
        state.isLoading = false;
      });
  }
});

export const {
  selectOrderError,
  getOrderModalInfo,
  getOrderRequest,
  selectIsOrderLoading,
  getOrderConfirmation
} = doOrderSlice.selectors;

export const { handleCloseOrderModal } = doOrderSlice.actions;

export const orderReducer = doOrderSlice.reducer;
