import { FC, useState, SyntheticEvent } from 'react';
import { ForgotPasswordUI } from '@ui-pages';
import {
  forgotPassword,
  selectPasswordResetError,
  selectUserLoadingStatus
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword: FC = () => {
  const isLoading = useSelector(selectUserLoadingStatus);
  const error = useSelector(selectPasswordResetError);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(forgotPassword({ email }))
      .unwrap()
      .then((data) => {
        if (data.success) {
          localStorage.setItem('resetPassword', 'true');
          navigate('/reset-password', { replace: true });
        }
      });
  };

  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      loading={isLoading}
    />
  );
};
