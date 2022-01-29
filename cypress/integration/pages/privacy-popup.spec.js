describe('Privacy Popup', () => {
  before(() => {
    cy.visit('/home')
  });

  it('verifies cookie notice is visible', () => {
    cy.get('[id*=cookieNotice]')
      .should(
        'contain',
        'Cookies and Privacy Policy'
      )
      .should(
        'contain',
        'We use cookies and other tracking technologies'
      ).within(() => {
        cy.get('[data-cy=accept-cookie]').should('be.visible');
        cy.get('[data-cy=privacy-link]').should('be.visible');
      });
  });

  it('navigates to privacy page', () => {
    cy.get('[data-cy=privacy-link]').click();
    cy.contains('Privacy Policy');
  });

  it('loads home page and shows hover box', () => {
    cy.visit('/home');
    cy.get('[id*=cookieNotice]').should('be.visible');
  });

  it('closes cookie notice', () => {
    cy.get('[data-cy=accept-cookie]').click();
    cy.get('[id*=cookieNotice]').should('not.be.visible');
  });
});
