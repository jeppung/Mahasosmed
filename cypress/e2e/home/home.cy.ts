describe("Home", () => {
  it("Render 'Test Mantine'", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Test Mantine");
  });

  it("Render login button", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login");
  });

  it("Render login page when login button clicked", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();

    cy.contains("Username");
  });
});
