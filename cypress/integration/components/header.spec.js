describe('Header component', () => {
  const menuItems = {
    joinIndex: ['Add Your Project', 'How to Add Your Project'],
    overview: ['About', 'FAQ', 'Contact Us'],
    collab: ['Collaborate with Us', 'Donate', 'Share the CTI', 'Volunteer with Us'],
    orgs: ['All', 'Affiliated', 'Unaffiliated', 'Index Contributors'],
  };

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
        menuItems.joinIndex.forEach((item) => {
          cy.contains(item).should('be.visible');
        });
      });

    cy.findLink('Overview')
      .should('have.attr', 'href', '/home')
      .trigger('mouseover')
      .get('[data-cy=menu-item]')
      .within(() => {
        menuItems.overview.forEach((item) => {
          cy.contains(item).should('be.visible');
        });
      });

    cy.findLink('Radical Collaboration')
      .should('have.attr', 'href', '/home')
      .trigger('mouseover')
      .get('[data-cy=menu-item]')
      .within(() => {
        menuItems.collab.forEach((item) => {
          cy.contains(item).should('be.visible');
        });
      });

    cy.findLink('Civic Tech Organizations')
      .should('have.attr', 'href', '/home')
      .trigger('mouseover')
      .get('[data-cy=menu-item]')
      .within(() => {
        menuItems.orgs.forEach((item) => {
          cy.contains(item).should('be.visible');
        });
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
