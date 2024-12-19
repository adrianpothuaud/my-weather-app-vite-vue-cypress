const pagesToCheck = [
  {url: '/', title: 'Home'},
]

pagesToCheck.forEach((page) => {
  it(`should display ${page.title} page with good accessibility`, () => {
    cy.visit(page.url);
    cy.injectAxe();
    cy.checkA11y();
  });
});
