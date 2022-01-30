describe('Header component', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('loads nav links', () => {
    cy.viewport(1280, 800);
    cy.findLink('Join the Index')
      .should('have.attr', 'href', '/home')
      .trigger('mouseover')
      .get('[data-cy=menu-item]')
      .within(() => {
        cy.contains('Add Your Project').should('be.visible');
        cy.contains('How to Add Your Project').should('be.visible');
      });

    cy.findLink('Overview')
      .should('have.attr', 'href', '/home')
      .trigger('mouseover')
      .get('[data-cy=menu-item]')
      .within(() => {
        cy.contains('About').should('be.visible');
        cy.contains('FAQ').should('be.visible');
        cy.contains('Contact Us').should('be.visible');
      });

    cy.findLink('Radical Collaboration')
      .should('have.attr', 'href', '/home')
      .trigger('mouseover')
      .get('[data-cy=menu-item]')
      .within(() => {
        cy.contains('Collaborate with Us').should('be.visible');
        cy.contains('Donate').should('be.visible');
        cy.contains('Share the CTI').should('be.visible');
        cy.contains('Volunteer with Us').should('be.visible');
      });

    cy.findLink('Civic Tech Organizations')
      .should('have.attr', 'href', '/home')
      .trigger('mouseover')
      .get('[data-cy=menu-item]')
      .within(() => {
        cy.contains('All').should('be.visible');
        cy.contains('Affiliated').should('be.visible');
        cy.contains('Unaffiliated').should('be.visible');
        cy.contains('Index Contributors').should('be.visible');
      });
  });

  it('mobile menu opens', () => {
    cy.viewport('iphone-8');
    cy.get('[class*=makeStyles-showMobileNav]').should('not.exist');
    cy.get('[data-cy=menuIcon]').click();
    cy.get('[class*=makeStyles-showMobileNav]').should('be.visible');
    cy.get('[class*=makeStyles-dropdownHeader]').first().should('have.text', 'Join the Index');
    cy.get('[class*=makeStyles-dropdownHeader]').eq(1).should('have.text', 'Overview');
    cy.get('[class*=makeStyles-dropdownHeader]').eq(2).should('have.text', 'Civic Tech Organizations');
    cy.get('[class*=makeStyles-dropdownHeader]').last().should('have.text', 'Radical Collaboration');
  });
});
