import { TUser } from '@utils-types';
import {
  logoutUser,
  checkUserAuth,
  registerUser,
  updateUser,
  forgotPassword,
  loginUser
} from './sliceApi';
import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  updateUserError: string | null;
  isLoading: boolean;

  forgotPasswordError: string | null;
  userData: TUser | null;

  loginError: string | null;

  registerError: string | null;
  checkAuthError: string | null;
  logoutError: string | null;
};

export const initialState: TInitialState = {
  logoutError: null,
  updateUserError: null,

  userData: null,
  isLoading: false,
  checkAuthError: null,
  isAuthChecked: false,
  isAuthenticated: false,
  forgotPasswordError: null,
  loginError: null,
  registerError: null
};

const clientApiSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectAuthCheckError: (state) => state.checkAuthError,

    selectPasswordResetError: (state) => state.forgotPasswordError,

    selectUserLoadingStatus: (state) => state.isLoading,

    selectUserData: (state) => state.userData,

    selectLoginError: (state) => state.loginError,

    selectUserUpdateError: (state) => state.updateUserError,

    selectAuthStatusChecked: (state) => state.isAuthChecked,

    selectIsUserAuthenticated: (state) => state.isAuthenticated,

    selectRegisterError: (state) => state.registerError
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.registerError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError =
          action.error.message || 'Не удалось зарегистрироваться';
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.loginError = action.error.message || 'Не удалось войти в аккаунт';
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isAuthChecked = true;
        state.userData = action.payload.user;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.checkAuthError =
          action.error.message ||
          'Ошибка проверки авторизованности пользователя';
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.logoutError =
          action.error.message || 'Не удалось выйти из аккаунта';
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
        state.checkAuthError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = null;
        state.isAuthenticated = false;
        state.isLoading = false;

        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.updateUserError =
          action.error.message || 'Не удалось обновить данные пользователя';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordError =
          action.error.message || 'Не удалось восстановить пароль';
        state.isLoading = false;
      });
  }
});

export const {
  selectUserLoadingStatus,
  selectIsUserAuthenticated,
  selectAuthStatusChecked,
  selectUserData,
  selectRegisterError,
  selectPasswordResetError,
  selectAuthCheckError,
  selectUserUpdateError,
  selectLoginError
} = clientApiSlice.selectors;
export const userReducer = clientApiSlice.reducer;
