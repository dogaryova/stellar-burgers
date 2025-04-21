import { FC, useEffect, useMemo } from 'react';

import {
  clearItem,
  handleCloseOrderModal,
  orderBurger,
  itemSelect,
  selectUserData
} from '@slices';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUserData);

  const constructorItems = useSelector(itemSelect);

  const orderModalData = useSelector((store) => store.order.orderModalData);
  const orderAccept = useSelector((store) => store.order.orderAccept);
  const orderRequest = useSelector((store) => store.order.orderRequest);

  useEffect(() => {
    if (orderAccept) dispatch(clearItem());
  }, [orderAccept]);

  const closeOrderModal = () => {
    dispatch(handleCloseOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = () => {
    if (
      !constructorItems.bun ||
      !constructorItems.ingredients.length ||
      orderRequest
    )
      return;
    if (!user) {
      navigate('/login');
    } else {
      dispatch(
        orderBurger([
          constructorItems.bun._id,
          ...constructorItems.ingredients.map((ingredient) => ingredient._id),
          constructorItems.bun._id
        ])
      );
    }
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      constructorItems={constructorItems}
    />
  );
};
