import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  selectIsUserAuthenticated,
  selectLoginError,
  selectUserLoadingStatus
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/clientApiSlice/sliceApi';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const error = useSelector(selectLoginError);
  const isLoading = useSelector(selectUserLoadingStatus);

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
      isLoading={isLoading}
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
