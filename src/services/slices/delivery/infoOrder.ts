import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';

type TInitialState = {
  orders: TOrder[];

  isLoading: boolean;

  error: string | null;
};

const initialState: TInitialState = {
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
    isOrderListLoading: (state) => state.isLoading,

    getOrderListError: (state) => state.error,

    getOrderList: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось загрузить заказ';

        state.isLoading = false;
      })

      .addCase(fetchOrder.pending, (state) => {
        state.error = null;

        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.error = null;

        state.orders = action.payload.orders;

        state.isLoading = false;
      });
  }
});

export const { getOrderList, getOrderListError, isOrderListLoading } =
  infoOrder.selectors;
export const orderInfoReducer = infoOrder.reducer;
