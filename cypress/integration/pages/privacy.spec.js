describe('About Page', () => {
  before(() => {
    cy.visit('/privacy')
  })

  it('header loads', () => {
    cy.contains('Join the Index')
  })

  it('footer loads', () => {
    cy.contains('The Civic Tech Index is an open-source project, read more on our')
  })

  it('title section loads', () => {
    cy.contains('Privacy Policy');
  })

  it('middle section loads', () => {
    cy.contains('Cookies and other tracking technologies');
  })

  it('end section loads', () => {
    cy.contains('Questions');
  })

})
