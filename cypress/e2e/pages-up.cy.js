const pagesToCheck = [
  {url: '/', title: 'Home'},
  {url: '/about', title: 'About'},
  {url: '/contact', title: 'Contact'},
]

describe('Pages up', () => {
  pagesToCheck.forEach((page) => {
    it(`should display ${page.title} page`, () => {
      cy.visit(page.url);
      cy.get('h1').should('have.text', page.title);
    });
  });
});