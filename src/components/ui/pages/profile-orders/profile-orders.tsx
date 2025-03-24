import { FC } from 'react';
import { ProfileMenu, OrdersList } from '@components';
import { ProfileOrdersUIProps } from './type';
import styles from './profile-orders.module.css';
import { Preloader } from '../../preloader';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({
  orders,
  loading
}) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    {loading ? (
      <Preloader />
    ) : (
      <div className={`mt-10 ${styles.orders}`}>
        <OrdersList orders={orders} />
      </div>
    )}
  </main>
);
