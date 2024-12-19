const pagesToCheck = [
  {url: '/', title: 'Home'},
]

describe('Pages up', () => {
  pagesToCheck.forEach((page) => {
    it(`should display ${page.title} page`, () => {
      cy.visit(page.url);
      cy.get('h1').should('have.text', page.title);
    });
  });
});