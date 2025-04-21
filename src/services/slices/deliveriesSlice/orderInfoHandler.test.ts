import { ordersReducer } from '../deliveriesSlice';

const sampleOrder = {
  _id: '65d0b04397ede0001d05c948',
  ingredients: ['643d69a5c3f7b9001cfa093c'],
  owner: '658556a887899c001b824aff',
  status: 'done',
  name: 'Краторный люминесцентный бургер',
  createdAt: '2024-02-17T13:10:27.612Z',
  updatedAt: '2024-02-17T13:10:28.088Z',
  number: 34391,
  __v: 0
};

const fulfilledAction = {
  type: 'orders/fetchOrders/fulfilled',
  payload: [sampleOrder]
};

const rejectedAction = {
  type: 'orders/fetchOrders/rejected',
  error: { message: 'Не удалось загрузить заказы' }
};

const pendingAction = {
  type: 'orders/fetchOrders/pending'
};

const initialState = {
  isLoading: false,
  error: null,
  orders: []
};

describe('ordersReducer', () => {
  test('должен вернуть начальное состояние', () => {
    expect(ordersReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('orders/fetchOrders/pending — установка загрузки', () => {
    const state = ordersReducer(initialState, pendingAction);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  test('orders/fetchOrders/fulfilled — успешная загрузка заказов', () => {
    const state = ordersReducer(initialState, fulfilledAction);
    expect(state).toEqual({
      ...initialState,
      orders: [sampleOrder],
      isLoading: false,
      error: null
    });
  });

  test('orders/fetchOrders/rejected — ошибка загрузки заказов', () => {
    const state = ordersReducer(initialState, rejectedAction);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Не удалось загрузить заказы'
    });
  });
});
