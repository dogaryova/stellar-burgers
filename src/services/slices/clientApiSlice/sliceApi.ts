import {
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  TLoginData,
  getUserApi,
  forgotPasswordApi,
  TRegisterData
} from '../../../utils/burger-api';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie, deleteCookie } from '../../../utils/cookie';

export const USER_EMAIL = 'email';

export const ACCESS_TOKEN_JVT = 'accessToken';

export const REFRESH_TOKEN_JVT = 'refreshToken';

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => {
    const response = await forgotPasswordApi(data);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem(REFRESH_TOKEN_JVT, response.refreshToken);
    setCookie(ACCESS_TOKEN_JVT, response.accessToken);

    return response;
  }
);

export const checkUserAuth = createAsyncThunk('user/checkUserAuth', getUserApi);

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
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const response = await logoutApi();
  localStorage.removeItem(USER_EMAIL);
  localStorage.removeItem(REFRESH_TOKEN_JVT);

  deleteCookie(ACCESS_TOKEN_JVT);
  return response;
});
