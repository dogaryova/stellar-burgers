import {
  burgerConstructorReducer,
  addItem,
  deleteItem,
  upItem,
  downItem,
  clearItem,
} from './createBurgerSlice';
import { TConstructorIngredient } from '@utils-types';

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
  id: 'filling-1'
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
  id: 'filling-2'
};

const initialState = {
  bun: null,
  ingredients: []
};

describe('burgerConstructorSlice reducer', () => {
  test('should handle initial state', () => {
    expect(burgerConstructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should handle addItem (bun)', () => {
    const action = addItem(sampleBun);
    const nextState = burgerConstructorReducer(initialState, action);
    expect(nextState.bun).toEqual(expect.objectContaining({ _id: sampleBun._id }));
  });

  test('should handle addItem (main)', () => {
    const action = addItem(ingredientOne);
    const nextState = burgerConstructorReducer(initialState, action);
    expect(nextState.ingredients.length).toBe(1);
    expect(nextState.ingredients[0]._id).toBe(ingredientOne._id);
  });

  test('should handle deleteItem', () => {
    const startState = {
      bun: sampleBun,
      ingredients: [ingredientOne, ingredientTwo]
    };
    const action = deleteItem({ id: 'filling-2', type: 'main' });
    const nextState = burgerConstructorReducer(startState, action);
    expect(nextState.ingredients).toEqual([ingredientOne]);
  });

  test('should handle upItem', () => {
    const startState = {
      bun: sampleBun,
      ingredients: [ingredientOne, ingredientTwo]
    };
    const action = upItem({ id: 'filling-2' });
    const nextState = burgerConstructorReducer(startState, action);
    expect(nextState.ingredients[0]).toBe(ingredientTwo);
    expect(nextState.ingredients[1]).toBe(ingredientOne);
  });

  test('should handle downItem', () => {
    const startState = {
      bun: sampleBun,
      ingredients: [ingredientTwo, ingredientOne]
    };
    const action = downItem({ id: 'filling-2' });
    const nextState = burgerConstructorReducer(startState, action);
    expect(nextState.ingredients[0]).toBe(ingredientOne);
    expect(nextState.ingredients[1]).toBe(ingredientTwo);
  });

  test('should handle clearItem', () => {
    const filledState = {
      bun: sampleBun,
      ingredients: [ingredientOne]
    };
    const nextState = burgerConstructorReducer(filledState, clearItem());
    expect(nextState).toEqual(initialState);
  });
});
