const pagesToCheck = [
  {url: '/', title: 'Home'},
]

pagesToCheck.forEach((page) => {
  it(`should display ${page.title} page with correct title`, () => {
    cy.visit(page.url);
    cy.get('h1').should('have.text', page.title);
  });
});
