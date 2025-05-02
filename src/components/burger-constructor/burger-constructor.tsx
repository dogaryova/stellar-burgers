import { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  itemSelect,
  clearItem,
  handleCloseOrderModal,
  orderBurger,
  selectUserData
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUserData);

  const constructorItems = useSelector(itemSelect);

  const orderRequest = useSelector((store) => store.order.orderRequest);
  const orderModalData = useSelector((store) => store.order.orderModalData);
  const orderAccept = useSelector((store) => store.order.orderAccept);

  useEffect(() => {
    if (orderAccept) dispatch(clearItem());
  }, [orderAccept]);

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

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
