// ***********************************************
Cypress.Commands.add("resetDb", () => {
    cy.exec(
        "cd ../server; node teardown.js",
        {failOnNonZeroExit: false}
    );
});

Cypress.Commands.add("seedDb", () => {
    cy.exec(
        "cd ../server; node seed.js",
        {failOnNonZeroExit: false}
    );
});