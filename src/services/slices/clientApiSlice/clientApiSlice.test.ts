import { userReducer as authSlice } from './clientApiSlice';

const initialState = {
  loginError: null,
  registerError: null,
  checkAuthError: null,
  isAuthChecked: false,
  isAuthenticated: false,
  logoutError: null,
  updateUserError: null,
  forgotPasswordError: null,
  userData: null,
  isLoading: false
};
import {
  logoutUser,
  checkUserAuth,
  updateUser,
  registerUser,
  loginUser,

  forgotPassword
} from './sliceApi';

const fakeUser = {
  email: 'test@yandex.ru',
  name: 'Ivan Petrov'
};

describe('clientApiSlice reducer', () => {
  test('should handle registerUser.fulfilled', () => {
    expect(
      authSlice(initialState, {
        type: registerUser.fulfilled.type,
        payload: { user: fakeUser }
      })
    ).toEqual({
      ...initialState,
      userData: fakeUser,
      isAuthenticated: true,
      isAuthChecked: true,
      isLoading: false
    });
  });

  test('should handle loginUser.fulfilled', () => {
    expect(
      authSlice(initialState, {
        type: loginUser.fulfilled.type,
        payload: { user: fakeUser }
      })
    ).toEqual({
      ...initialState,
      userData: fakeUser,
      isAuthenticated: true,
      isAuthChecked: true,
      isLoading: false
    });
  });

  test('should handle checkUserAuth.fulfilled', () => {
    expect(
      authSlice(initialState, {
        type: checkUserAuth.fulfilled.type,
        payload: { user: fakeUser }
      })
    ).toEqual({
      ...initialState,
      userData: fakeUser,
      isAuthenticated: true,
      isAuthChecked: true,
      isLoading: false
    });
  });

  test('should handle logoutUser.fulfilled', () => {
    const stateBefore = {
      ...initialState,
      userData: fakeUser,
      isAuthenticated: true,
      isAuthChecked: true
    };

    expect(
      authSlice(stateBefore, {
        type: logoutUser.fulfilled.type
      })
    ).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });

  test('should handle updateUser.fulfilled', () => {
    const updatedUser = { email: 'test@yandex.ru', name: 'Ivan Petrovsky' };
    const stateBefore = {
      ...initialState,
      userData: fakeUser,
      isAuthChecked: true
    };

    expect(
      authSlice(stateBefore, {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      })
    ).toEqual({
      ...stateBefore,
      userData: updatedUser,
      isLoading: false
    });
  });

  test('should handle forgotPassword.rejected', () => {
    expect(
      authSlice(initialState, {
        type: forgotPassword.rejected.type,
        error: { message: 'Ошибка восстановления' }
      })
    ).toEqual({
      ...initialState,
      forgotPasswordError: 'Ошибка восстановления',
      isLoading: false
    });
  });
});
