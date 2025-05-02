import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/slices/clientApiSlice/sliceApi';
import {
  selectIsUserAuthenticated,
  selectRegisterError,
  selectUserLoadingStatus
} from '@slices';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  const errorText = useSelector(selectRegisterError);
  const isLoading = useSelector(selectUserLoadingStatus);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const isEmpty = !userName || !email || !password;
    if (isEmpty) return;

    dispatch(registerUser({ email, password, name: userName }));
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <RegisterUI
      isLoading={isLoading}
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
