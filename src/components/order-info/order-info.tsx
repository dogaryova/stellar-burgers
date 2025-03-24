import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrder, burgerIngredientsSelector, getOrderList } from '@slices';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();

  const orderNumber = useMatch('/feed/:number')
    ? Number(useMatch('/feed/:number')?.params.number)
    : Number(useMatch('/profile/orders/:number')?.params.number);

  useEffect(() => {
    dispatch(fetchOrder(orderNumber));
  }, [orderNumber]);

  const orders = useSelector(getOrderList);
  const orderData = orders.find((order) => order.number === orderNumber);

  const ingredients = useSelector(burgerIngredientsSelector);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
