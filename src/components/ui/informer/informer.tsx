import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './informer.module.css';

type InformerProps = {
  children: React.ReactNode;
  variant?: 'default' | 'error';
};

export const Informer: FC<InformerProps> = (props) => {
  const { children, variant = 'default' } = props;

  return (
    <div
      className={clsx(
        styles.wrapper,
        variant === 'default' && styles.bgDefault,
        variant === 'error' && styles.bgError
      )}
    >
      <p className='text text_type_main-default'>{children}</p>
    </div>
  );
};
