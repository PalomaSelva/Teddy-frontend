describe('Login', () => {
  it('should log in successfully', () => {
    cy.visit('/');
    cy.get('input').type('Paloma');
    cy.get('button').click();
    cy.url().should('include', '/customers');
  });
});
