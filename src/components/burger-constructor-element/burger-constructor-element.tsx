import { FC, memo } from 'react';

import { useDispatch } from '../../services/store';
import { BurgerConstructorElementUI } from '@ui';
import { deleteItem, downItem, upItem } from '@slices';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
      dispatch(deleteItem(ingredient));
    };

    const handleMoveUp = () => {
      dispatch(upItem(ingredient));
    };
    const handleMoveDown = () => {
      dispatch(downItem(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
        ingredient={ingredient}
        index={index}
      />
    );
  }
);
