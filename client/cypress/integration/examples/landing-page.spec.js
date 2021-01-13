/// <reference types="cypress" />

context("Landing Page", () => {

  it("Must contain Logo and Link", () => {
    cy.visit("/")
    .get('#jammit-logo').should('have.attr', 'alt', 'jammit-logo')
    .get('#jammit-landing-title').should('have.text', 'Jammit')
    .get('#landing-page-link').should('have.attr', 'href', '/login' ).click()
    .get('#jammit-logo').should('not.exist')
    .get('#jammit-landing-title').should('not.exist')
  });
});
