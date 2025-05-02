import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import {
  fetchOrders,
  selectOrdersLoadingStatus,
  selectOrdersData
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrdersData);
  const ordersLoading = useSelector(selectOrdersLoadingStatus);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return <ProfileOrdersUI loading={ordersLoading} orders={orders} />;
};
