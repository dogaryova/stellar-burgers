import {
  burgerConstructorReducer,
  addItem,
  clearItem,
  upItem,
  downItem,
  deleteItem
} from '../createBurgerSlice/createBurgerSlice';

import { ingredientsReducer } from './burgerContentSlice';

import type { TConstructorIngredient } from '@utils-types';

import {initialState} from './burgerContentSlice'

const sampleBun: TConstructorIngredient = {
  _id: '60666c42cc7b410027a1a9b1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'bun-1'
};

const ingredientOne: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'main-1'
};

const ingredientTwo: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0940',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  id: 'main-2'
};

const initialConstructorState = {
  bun: null,
  ingredients: []
};

describe('burgerConstructorReducer', () => {
  test('Добавляет булку', () => {
    const nextState = burgerConstructorReducer(
      initialConstructorState,
      addItem(sampleBun)
    );
    expect(nextState.bun?._id).toBe(sampleBun._id);
  });

  test('Добавляет начинку', () => {
    const nextState = burgerConstructorReducer(
      initialConstructorState,
      addItem(ingredientOne)
    );
    expect(nextState.ingredients.length).toBe(1);
  });

  test('Удаляет элемент по id', () => {
    const state = {
      bun: sampleBun,
      ingredients: [ingredientOne, ingredientTwo]
    };
    const nextState = burgerConstructorReducer(
      state,
      deleteItem({ id: 'main-2', type: 'main' })
    );
    expect(nextState.ingredients).toEqual([ingredientOne]);
  });

  test('Меняет порядок — вверх', () => {
    const state = {
      bun: sampleBun,
      ingredients: [ingredientOne, ingredientTwo]
    };
    const nextState = burgerConstructorReducer(state, upItem({ id: 'main-2' }));
    expect(nextState.ingredients).toEqual([ingredientTwo, ingredientOne]);
  });

  test('Меняет порядок — вниз', () => {
    const state = {
      bun: sampleBun,
      ingredients: [ingredientTwo, ingredientOne]
    };
    const nextState = burgerConstructorReducer(
      state,
      downItem({ id: 'main-2' })
    );
    expect(nextState.ingredients).toEqual([ingredientOne, ingredientTwo]);
  });

  test('Очищает конструктор', () => {
    const filledState = {
      bun: sampleBun,
      ingredients: [ingredientOne]
    };
    const nextState = burgerConstructorReducer(filledState, clearItem());
    expect(nextState).toEqual(initialConstructorState);
  });
});

describe('ingredientsReducer', () => {

  const mockPayload = [sampleBun, ingredientOne, ingredientTwo];

  test('Загрузка ингредиентов выполнена (fulfilled)', () => {
    const nextState = ingredientsReducer(initialState, {
      type: 'ingredients/fetchIngredients/fulfilled',
      payload: mockPayload
    });
    expect(nextState.ingredients).toHaveLength(3);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  test('Идёт загрузка ингредиентов (pending)', () => {
    const nextState = ingredientsReducer(initialState, {
      type: 'ingredients/fetchIngredients/pending'
    });
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('Ошибка при загрузке (rejected)', () => {
    const nextState = ingredientsReducer(initialState, {
      type: 'ingredients/fetchIngredients/rejected',
      error: { message: 'Ошибка загрузки' }
    });
    expect(nextState.error).toBe('Ошибка загрузки');
    expect(nextState.isLoading).toBe(false);
  });
});
