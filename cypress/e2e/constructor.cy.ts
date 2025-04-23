describe('BurgerIngredientUI component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  it('Открывает модалку при клике на ингредиент', () => {
    cy.contains('Флюоресцентная булка R2-D3').click();
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
    cy.contains('Флюоресцентная булка R2-D3').parent().contains('Добавить').click();
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
    cy.contains('Флюоресцентная булка R2-D3').click();
  });
});


describe('AppHeader component', () => {
  it('Содержит ссылку на "Конструктор"', () => {
    cy.visit('/');
    cy.contains('Конструктор').should('have.attr', 'href');
  });
});
