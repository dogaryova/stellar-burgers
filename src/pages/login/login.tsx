import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  selectIsUserAuthenticated,
  selectLoginError,
  selectUserLoadingStatus
} from '@slices';
import { Navigate } from 'react-router-dom';

import { loginUser } from '../../services/slices/customerApiStore/apiLayer';
import { useDispatch, useSelector } from '../../services/store';
export const Login: FC = () => {
  const isError = useSelector(selectLoginError);
  const isLoad = useSelector(selectUserLoadingStatus);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const isEmpty = !email || !password;
    if (isEmpty) return;

    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <LoginUI
      isLoading={isLoad}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      errorText={isError}
      email={email}
      setEmail={setEmail}
      password={password}
    />
  );
};
