/// <reference types="cypress" />

context("Login", () => {
  before(() => {
    // reset and seed the database prior to every test
    cy.resetDb();
    cy.seedDb();
  });

  it.only("successfully loads", () => {
    cy.visit("/login");
  });

  it("All fields are required", () => {
    cy.get(".page-title")
      .should("have.text", " Welcome Back ")
      .get(".username-input p")
      .should("not.exist")

      .get(".password-input p")
      .should("not.exist")

      .get(".action-button")
      .should("not.have.attr", "disabled")

      .get(".username-input input")
      .clear()

      .get(".password-input input")
      .clear()

      .get(".action-button")
      .click()
      .get(".username-input p")
      .should("have.text", "This field is required")
      .get(".password-input p")
      .should("have.text", "This field is required")
      .get(".action-button")
      .should("have.attr", "disabled");
  });

  it("User has to be registered to sucessfully login", () => {
    cy.get(".username-input input")
      .clear()

      .get(".password-input input")
      .clear()

      .get(".username-input")
      .type("johndoe123")
      .get(".password-input")
      .type("1234")
      .get(".action-button")
      .click()
      .get(".error")
      .should("have.text", "Incorrect username.");
  });

  it("User needs to insert correct password to sucessfully login", () => {
    cy.get(".username-input input")
      .clear()

      .get(".password-input input")
      .clear()

      .get(".username-input")
      .type("johndoe")
      .get(".password-input")
      .type("abcd")
      .get(".action-button")
      .click()
      .get(".error")
      .should("have.text", "Incorrect username.");
  });

  it.only("User has to validate account to sucessfully login", () => {
    cy.get(".username-input input")
      .clear()
      .get(".password-input input")
      .clear()
      .get(".username-input")
      .type("johndoe")
      .get(".password-input")
      .type("1234")
      .get(".action-button")
      .click()
      .get(".error")
      .should("have.text", "Must activate account. Please check your mailbox.")
      .visit("/confirm/validationCode")
      .get(".page-title")
      .should("have.text", "Account Verified. Welcome!")
      .get("a")
      .should("have.attr", "href", "/login")
      .get("a")
      .click()
      .get(".username-input")
      .type("johndoe")
      .get(".password-input")
      .type("1234");
  });
});
