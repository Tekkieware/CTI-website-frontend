describe('How To Add Page', () => {
  before(() => {
    cy.visit('/join-index/how-to-add');
  });

  it('header section loads', () => {
    cy.contains('How to Add Your Project');
  });

  it('middle section loads', () => {
    cy.contains('After you have finished adding your tags, click Save Changes');
  });

  it('copies correct URL', () => {
    cy.get('[data-cy=copy-link').click();
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq('http://localhost:3000/join-index/how-to-add');
      });
    });
  });
});
