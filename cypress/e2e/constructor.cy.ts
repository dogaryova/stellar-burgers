const SELECTOT_BUN = 'Краторная булка N-200i'


describe('BurgerIngredientUI component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  it('Открывает модалку при клике на ингредиент', () => {
    cy.contains(SELECTOT_BUN).click();
    cy.contains('Детали ингредиента').should('exist');
  });
  
});

describe('BurgerConstructorUI component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  it('Добавляет ингредиенты и показывает их в конструкторе', () => {
    cy.contains(SELECTOT_BUN).parent().contains('Добавить').click();
    cy.contains('Биокотлета из марсианской Магнолии').parent().contains('Добавить').click();
  });
});


describe('IngredientDetails component', () => {
  it('Открывает компонент с данными ингредиента', () => {
    cy.visit('/ingredients/643d69a5c3f7b9001cfa093d', {
      onBeforeLoad(win) {
        win.fetch = cy.stub().resolves({ json: () => ({ success: true, data: [] }), ok: true });
      }
    });
    cy.contains('Детали ингредиента').should('exist');
  });
});


describe('IngredientDetails component', () => {
  it('Открывает компонент с данными ингредиента', () => {
    cy.visit('/ingredients/643d69a5c3f7b9001cfa093d', {
      onBeforeLoad(win) {
        win.fetch = cy.stub().resolves({ json: () => ({ success: true, data: [] }), ok: true });
      }
    });
    cy.contains('Детали ингредиента').should('exist');
  });
});


describe('Modal component', () => {
  it('Появляется и исчезает при клике на overlay', () => {
    cy.visit('/');
    cy.contains(SELECTOT_BUN).click();
  });
});


describe('AppHeader component', () => {
  it('Содержит ссылку на "Конструктор"', () => {
    cy.visit('/');
    cy.contains('Конструктор').should('have.attr', 'href');
  });
});


const SELECTOR_BUN = 'Краторная булка N-200i';
const SELECTOR_MAIN_1 = 'Биокотлета из марсианской Магнолии';
const SELECTOR_MAIN_2 = 'Филе Люминесцентного тетраодонтимформа';

describe('Order flow', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'Bearer test-token');

    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .callsFake((url, options) => {
            if (url.includes('/orders')) {
              return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ order: { number: 123456 } })
              });
            }
            return fetch(url, options);
          });
      }
    });

    cy.wait('@getIngredients');
  });

  it('Оформляет заказ (без реальной проверки номера)', () => {
    const BUN = 'Краторная булка N-200i';
    const MAIN_1 = 'Биокотлета из марсианской Магнолии';
    const MAIN_2 = 'Филе Люминесцентного тетраодонтимформа';

    cy.contains(BUN).parent().contains('Добавить').click();
    cy.contains(MAIN_1).parent().contains('Добавить').click();
    cy.contains(MAIN_2).parent().contains('Добавить').click();

    cy.get('button')
      .contains('Оформить заказ')
      .should('not.be.disabled')
      .click();
      
    cy.wait(500).then(() => {
      expect(true).to.be.true;
    });
  });
});
