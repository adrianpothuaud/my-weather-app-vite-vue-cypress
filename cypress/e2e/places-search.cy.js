describe('Places Search Feature', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the search input', () => {
    cy.get('[data-cy=search-input]').should('be.visible');
  });

  it('should allow typing in the search input', () => {
    cy.get('[data-cy=search-input]').type('New York')
    cy.get('[data-cy=search-input]').should('have.value', 'New York');
  });

  it('should display search results when typing', () => {
    cy.get('[data-cy=search-input]').type('New York');
    cy.get('[data-cy=search-results]').should('be.visible');
  });

  it('should display weather information when a place is selected', () => {
    cy.get('[data-cy=search-input]').type('New York');
    cy.get('[data-cy=search-result-item]').first().click();
    cy.get('[data-cy=weather-info]').should('be.visible');
  });

  it('should display an error message for invalid search', () => {
    cy.get('[data-cy=search-input]').type('InvalidPlaceName');
    cy.get('[data-cy=search-results]').should('not.exist');
    cy.get('[data-cy=error-message]').should('be.visible');
  });
});