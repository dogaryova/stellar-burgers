import { TOrder, TOrdersData } from '@utils-types';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi } from '@api';

type TInitialState = {
  error: string | null;
  listItemInfo: {
    totalToday: number;
    total: number;
  };
  feedData: TOrdersData | null;

  listItem: TOrder[];
  isLoading: boolean;
};

const initialState: TInitialState = {
  listItem: [],

  listItemInfo: {
    total: 0,
    totalToday: 0
  },
  feedData: null,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', getFeedsApi);

const itemsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    itemListSelect: (state) => state.listItemInfo,
    errorSelector: (state) => state.error,
    itemLoad: (state) => state.isLoading,
    itemDataSelect: (state) => state.feedData,

    listSelecors: (state) => state.listItem
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchFeeds.rejected, (state, action) => {
        state.error =
          action.error.message || 'Не удалось загрузить лист заказов';
        state.isLoading = false;
      })
      .addCase(fetchFeeds.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.listItem = action.payload.orders;

        state.listItemInfo.totalToday = action.payload.totalToday;
        state.error = null;
        state.listItemInfo.total = action.payload.total;
        state.isLoading = false;
      });
  }
});

export const {
  itemDataSelect,
  errorSelector,
  listSelecors,
  itemLoad,
  itemListSelect
} = itemsSlice.selectors;
export const feedsReducer = itemsSlice.reducer;
