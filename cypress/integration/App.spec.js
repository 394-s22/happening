/* globals cy */

describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('opens with Fall CS courses', () => {
    cy.visit ('/');
    cy.get('[data-cy=test]').should('contain', 'Please sign in with your school affiliated email');
  });

  it ('navigates to My Events page', () => {
    cy.visit ('/');
    cy.get('[data-cy=btn-sign-in]').click();
    cy.get('[data-cy=btn-sign-out').should('contain', 'Sign out');
  })
});
