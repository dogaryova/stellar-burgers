import { FC, useEffect } from 'react';
import {
  fetchOrders,
  selectOrdersLoadingStatus,
  selectOrdersData
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const ordersIsLoading = useSelector(selectOrdersLoadingStatus);
  const dispatch = useDispatch();
  const ourOrders = useSelector(selectOrdersData);
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return <ProfileOrdersUI loading={ordersIsLoading} orders={ourOrders} />;
};
