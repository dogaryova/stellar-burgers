import { getOrdersApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
type TInitialState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};
export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

const initialState: TInitialState = {
  error: null,
  isLoading: false,

  orders: []
};

const deliveriesSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersLoadingStatus: (state) => state.isLoading,

    selectOrdersData: (state) => state.orders,

    selectOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;

        state.error = null;
        state.isLoading = false;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.error.message || 'Не удалось загрузить заказы';
      });
  }
});

export const {
  selectOrdersLoadingStatus,
  selectOrdersData,

  selectOrdersError
} = deliveriesSlice.selectors;
export const ordersReducer = deliveriesSlice.reducer;
