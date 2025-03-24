import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '@slices';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then((data) => {
        if (data.success) {
          navigate(location.pathname, {
            replace: true,
            state: { ...state, from: undefined }
          });
        }
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
