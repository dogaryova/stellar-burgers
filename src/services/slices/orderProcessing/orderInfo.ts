import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TInitlState = {
  error: string | null;
  orders: TOrder[];
  isLoading: boolean;
};

const initialState: TInitlState = {
  error: null,
  isLoading: false,

  orders: []
};

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (number: number) => {
    const order = await getOrderByNumberApi(number);
    return order;
  }
);

const infoOrder = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  selectors: {
    getOrderListError: (state) => state.error,
    isOrderListLoading: (state) => state.isLoading,
    getOrderList: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить заказ';
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload.orders;
      });
  }
});

export const orderInfoReducer = infoOrder.reducer;
export const { getOrderListError, isOrderListLoading, getOrderList } =
  infoOrder.selectors;
