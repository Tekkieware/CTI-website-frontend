describe('Popup Page', () => {
  before(() => {
    cy.visit('/privacy/popup');
  });

  it('header loads', () => {
    cy.contains('Cookies and Privacy Policy');
  });
  it('loads cookie hover box description', () => {
    cy.get('[class*=hoverContent]').should(
      'contain',
      'We use cookies and other tracking technologies'
    );
  });

  it('loads Learn More and Accept Button', () => {
    cy.get('[class*=buttonLinkStyle]').within(() => {
      cy.get('[class*=linkText]').should('be.visible').first().click();
    });
    cy.wait(500);
    cy.visit('/privacy/popup');
    cy.get('[class*=buttonLinkStyle]').within(() => {
      cy.get('[data-cy=accept-cookie]').should('be.visible').first().click();
    });
  });
});
