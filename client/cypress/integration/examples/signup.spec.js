/// <reference types="cypress" />

context("Signup", () => {
  before(() => {
    // reset and seed the database prior to every test
    cy.resetDb();
    cy.seedDb();
  });

  it("successfully loads", () => {
    cy.visit("/");
  });

  it("All fields are required", () => {
    cy.visit("/")
      .get("#landing-page-link")
      .should("have.attr", "href", "/login")
      .click()
      .get("#login-signup-link")
      .should("have.attr", "href", "/signup")
      .click()
      .get(".page-title")
      .should("have.text", " Sign up to Jammit ")
      .get(".username-input p")
      .should("not.exist")
      .get(".email-input p")
      .should("not.exist")
      .get(".password-input p")
      .should("not.exist")
      .get(".action-button")
      .should("not.have.attr", "disabled")
      .get(".action-button")
      .click()
      .get(".username-input p")
      .should("have.text", "This field is required")
      .get(".email-input p")
      .should("have.text", "This field is required")
      .get(".password-input p")
      .should("have.text", "This field is required")
      .get(".action-button")
      .should("have.attr", "disabled");
  });

  it("Cannot register users with duplicate usernames", () => {
    cy.get(".username-input input")
      .clear()
      .get(".email-input input")
      .clear()
      .get(".password-input input")
      .clear()
      .get(".username-input")
      .type("johndoe")
      .get(".email-input")
      .type("johndoe@mail.com")
      .get(".password-input")
      .type("1234")
      .get(".action-button")
      .click()
      .get(".error")
      .should("have.text", "Username taken. Choose another one.");
  });

  it("Cannot register users with duplicate emails", () => {
    cy.get(".username-input input")
      .clear()
      .get(".email-input input")
      .clear()
      .get(".password-input input")
      .clear()
      .get(".username-input")
      .type("anotherjohn")
      .get(".email-input")
      .type("example@example.com")
      .get(".password-input")
      .type("1234")
      .get(".action-button")
      .click()
      .get(".error")
      .should("have.text", "Email taken. Choose another one.");
  });

  it("Successfully regist a new user", () => {
    cy.get(".username-input input")
      .clear()
      .get(".email-input input")
      .clear()
      .get(".password-input input")
      .clear()
      .get(".username-input")
      .type("janedoe")
      .get(".email-input")
      .type("janedoe@mail.com")
      .get(".password-input")
      .type("1234")
      .get(".action-button")
      .click()
      .get(".info-text")
      .should(
        "have.text",
        "You are successfully signed up. Please check your email to activate your account"
      );
  });
});
