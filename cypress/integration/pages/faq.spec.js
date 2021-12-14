const SEARCH = 'civic';
// const Q1 = 'Can I add multiple projects';
const Q2 = 'Who are index contributors';
// const A1 = 'Yes, Please follow the link to add multiple projects.';
const A2 = 'are our partners who have contributed to the Civic Tech Index';

describe('FAQ Page (using API)', () => {
  before(() => {
    cy.intercept(`${Cypress.env('REACT_APP_API_URL')}/api/faqs/*`).as(
      'getFaqs'
    );
    cy.visit('/about/faq');
    cy.wait('@getFaqs');
  });

  it('gets faq by search', () => {
    cy.intercept(`${Cypress.env('REACT_APP_API_URL')}/api/faqs/*`).as(
      'getFaqs'
    );
    cy.get('[data-cy=search-faq]').type(SEARCH);
    cy.wait('@getFaqs');
    cy.get('[data-cy=faq-question]')
      .first()
      .contains(Q2)
      .click({ force: true });
    cy.get('[data-cy=faq-answer]').first().should('contain', A2);
  });
});

/*
 * describe('FAQ Page (using fixture)', () => {
 *   before(() => {
 *     cy.intercept('GET', `${Cypress.env('REACT_APP_API_URL')}/api/faqs/*`, (req) => {
 *       req.reply({
 *         statusCode: 200,
 *         fixture: 'faqs.json',
 *       });
 *     });
 *     cy.visit('/about/faq');
 *   });
 */

/*
 *   it('title section loads', () => {
 *     cy.contains('How can we help?');
 *   });
 */

/*
 *   it('default faq list is loaded', () => {
 *     cy.get('[data-cy=faq-question]').should('have.length', 10);
 *     cy.get('[data-cy=faq-question]')
 *       .first()
 *       .contains(Q1)
 *       .click({ force: true });
 *     cy.get('[data-cy=faq-answer]').first().should('contain', A1);
 *   });
 * });
 */
