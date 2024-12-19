const pagesToCheck = [
  {url: '/', title: 'Home'},
]

describe('Pages accessibility criteria', () => {
  pagesToCheck.forEach((page) => {
    it(`should display ${page.title} page`, () => {
      cy.visit(page.url);
      // TODO: Add accessibility checks
    });
  });
});