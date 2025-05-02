import { Informer, Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { listSelecors, errorSelector, itemLoad, fetchFeeds } from '@slices';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(listSelecors);
  const ordersLoading = useSelector(itemLoad);
  const ordersError = useSelector(errorSelector);

  const handleGetFeeds = useCallback(() => dispatch(fetchFeeds()), []);

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (ordersLoading) {
    return <Preloader />;
  }

  if (ordersError) {
    return <Informer variant='error'>{ordersError}</Informer>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
