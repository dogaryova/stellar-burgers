import { FC, SyntheticEvent, useEffect, useState } from 'react';

import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';

import { useNavigate } from 'react-router-dom';

export const ResetPassword: FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    resetPasswordApi({ password, token })
      .then(() => {
        navigate('/login');
        localStorage.removeItem('resetPassword');
      })
      .catch((err) => setError(err));
  };

  return (
    <ResetPasswordUI
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
      errorText={error?.message || ''}
      password={password}
      token={token}
    />
  );
};
