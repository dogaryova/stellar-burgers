import { Informer, Preloader } from '@ui';
import { FC, useCallback, useEffect } from 'react';
import { listSelecors, errorSelector, itemLoad, fetchFeeds } from '@slices';
import { useDispatch, useSelector } from '../../services/store';

import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const ordersIsLoading = useSelector(itemLoad);
  const ourOrdersError = useSelector(errorSelector);

  const orders: TOrder[] = useSelector(listSelecors);

  const handleGetFeeds = useCallback(() => dispatch(fetchFeeds()), []);

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (ordersIsLoading) {
    return <Preloader />;
  }

  if (ourOrdersError) {
    return <Informer variant='error'>{ourOrdersError}</Informer>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
