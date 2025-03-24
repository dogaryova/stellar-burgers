import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectUserData } from '@slices';

import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUserData)?.name;
  return <AppHeaderUI userName={userName} />;
};
