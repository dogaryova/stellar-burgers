import { createSlice } from '@reduxjs/toolkit';

import {
  logoutUser,
  forgotPassword,
  checkUserAuth,
  updateUser,
  loginUser,
  registerUser
} from './apiLayer';
import { TUser } from '@utils-types';

type TInitlState = {
  isLoading: boolean;
  registerError: string | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  checkAuthError: string | null;
  logoutError: string | null;
  loginError: string | null;
  updateUserError: string | null;
  forgotPasswordError: string | null;
  userData: TUser | null;
};

const initialState: TInitlState = {
  updateUserError: null,
  forgotPasswordError: null,
  isAuthenticated: false,
  loginError: null,
  registerError: null,
  checkAuthError: null,
  userData: null,
  isLoading: false,
  isAuthChecked: false,

  logoutError: null
};

const clientApiSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUserData: (state) => state.userData,
    selectAuthStatusChecked: (state) => state.isAuthChecked,
    selectLoginError: (state) => state.loginError,

    selectIsUserAuthenticated: (state) => state.isAuthenticated,
    selectUserUpdateError: (state) => state.updateUserError,
    selectPasswordResetError: (state) => state.forgotPasswordError,
    selectRegisterError: (state) => state.registerError,
    selectAuthCheckError: (state) => state.checkAuthError,
    selectUserLoadingStatus: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.loginError = action.error.message || 'Не удалось войти в аккаунт';
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.registerError =
          action.error.message || 'Не удалось зарегистрироваться';
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginError = null;
        state.isLoading = true;
      })

      .addCase(checkUserAuth.rejected, (state, action) => {
        state.checkAuthError =
          action.error.message ||
          'Ошибка проверки авторизованности пользователя';
        state.isAuthChecked = true;
        state.isLoading = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.logoutError =
          action.error.message || 'Не удалось выйти из аккаунта';
      })

      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
        state.checkAuthError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.userData = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserError =
          action.error.message || 'Не удалось обновить данные пользователя';
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordError =
          action.error.message || 'Не удалось восстановить пароль';
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isLoading = false;
      });
  }
});

export const {
  selectAuthCheckError,
  selectUserLoadingStatus,
  selectIsUserAuthenticated,
  selectAuthStatusChecked,
  selectUserData,
  selectRegisterError,
  selectLoginError,
  selectUserUpdateError,
  selectPasswordResetError
} = clientApiSlice.selectors;

export const userReducer = clientApiSlice.reducer;
