describe('Favorite Places', () => {
  const favoritePlace = 'New York';

  beforeEach(() => {
    // Clear local storage before each test
    cy.clearLocalStorage();
  });

  it('should add a place to favorites', () => {
    cy.visit('/');
    cy.get('[data-cy=add-favorite]').type(favoritePlace);
    cy.get('[data-cy=add-favorite-button]').click();
    cy.get('[data-cy=favorite-list]').should('contain', favoritePlace);
  });

  it('should persist favorites in local storage', () => {
    cy.visit('/');
    cy.get('[data-cy=add-favorite]').type(favoritePlace);
    cy.get('[data-cy=add-favorite-button]').click();
    cy.reload();
    cy.get('[data-cy=favorite-list]').should('contain', favoritePlace);
  });

  it('should remove a place from favorites', () => {
    cy.visit('/');
    cy.get('[data-cy=add-favorite]').type(favoritePlace);
    cy.get('[data-cy=add-favorite-button]').click();
    cy.get(`[data-cy=remove-favorite]`).click();
    cy.get('[data-cy=favorite-list]').should('not.contain', favoritePlace);
  });
});