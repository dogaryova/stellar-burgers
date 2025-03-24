import { setCookie, deleteCookie } from '../../../utils/cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  forgotPasswordApi,
  TRegisterData,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  getUserApi,
  updateUserApi
} from '@api';

export const USER_EMAIL = 'email';
export const ACCESS_TOKEN_JVT = 'accessToken';
export const REFRESH_TOKEN_JVT = 'refreshToken';

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie(ACCESS_TOKEN_JVT, response.accessToken);

    localStorage.setItem(USER_EMAIL, response.user.email);
    localStorage.setItem(REFRESH_TOKEN_JVT, response.refreshToken);

    return response;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie(ACCESS_TOKEN_JVT, response.accessToken);
    localStorage.setItem(REFRESH_TOKEN_JVT, response.refreshToken);
    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  localStorage.removeItem(REFRESH_TOKEN_JVT);

  deleteCookie(ACCESS_TOKEN_JVT);
  const response = await logoutApi();
  localStorage.removeItem(USER_EMAIL);
  return response;
});

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => {
    const response = await forgotPasswordApi(data);
    return response;
  }
);

export const checkUserAuth = createAsyncThunk('user/checkUserAuth', getUserApi);
