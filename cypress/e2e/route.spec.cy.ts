describe("availability opf service", function () {
  before(function () {
    cy.viewport(1655, 1080);
    cy.visit("http://localhost:3000");
  });

  it("check if the main page is /burger-react", function () {
    cy.viewport(1655, 1080);
    cy.visit("http://localhost:3000/burger-react");
    cy.contains("Соберите бургер");
  });

  it('"Лента заказов" opens  when we click on "Лента заказов" in a header', function () {
    cy.viewport(1655, 1080);
    cy.visit("http://localhost:3000/burger-react");
    cy.get("header").contains("Лента заказов").click();
    cy.contains("Лента заказов");
  });

  it('Login page opens when we click on "Войти" in a header ', function () {
    cy.viewport(1655, 1080);
    cy.visit("http://localhost:3000/burger-react");
    cy.get("header").contains("Войти").click();
    cy.contains("Вход");
  });
});
