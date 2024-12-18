const pagesToCheck = [
  {url: '/', title: 'Home'},
  {url: '/about', title: 'About'},
  {url: '/contact', title: 'Contact'},
]

describe('Pages accessibility criteria', () => {
  pagesToCheck.forEach((page) => {
    it(`should display ${page.title} page`, () => {
      cy.visit(page.url);
      // TODO: Add accessibility checks
    });
  });
});