import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordUI } from '@ui-pages';
import {
  forgotPassword,
  selectPasswordResetError,
  selectUserLoadingStatus
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoadingStatus);
  const error = useSelector(selectPasswordResetError);
  const navigate = useNavigate();

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
      loading={loading}
    />
  );
};
