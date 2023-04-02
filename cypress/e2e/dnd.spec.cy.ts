const getIngredient = 'div[class^="burgerIngredientsGroup_group"] > a';
const burgerConstructorSection = 'section[class^="burgerConstructor_section"]';
const ingredientTitle = 'span[class="constructor-element__text"]';

describe("drag-and-drop works correctly", function () {
  before(function () {
    cy.viewport(1655, 1080);
    cy.visit("/burger-react");
  });

  it("dnd for a bun works correctly", function () {
    cy.viewport(1655, 1080);
    cy.get(getIngredient).first().as("draggedBunIngredient");
    cy.get(burgerConstructorSection).as("dropSection");

    cy.get("@draggedBunIngredient").trigger("dragstart");
    cy.get("@dropSection").trigger("drop");

    let title = null;
    cy.get("@draggedBunIngredient")
      .find("h4")
      .invoke("text")
      .then((text) => {
        title = text;
      });

    cy.get("@dropSection")
      .find(ingredientTitle)
      .first()
      .invoke("text")
      .then((text) => {
        expect(`${title} (верх)`).to.equal(text);
      });
    cy.get("@dropSection")
      .find(ingredientTitle)
      .last()
      .invoke("text")
      .then((text) => {
        expect(`${title} (низ)`).to.equal(text);
      });

    cy.get("@draggedBunIngredient")
      .find('p[class^="counter__num"]')
      .invoke("text")
      .then((text) => expect("2").to.equal(text));
  });

  it("dnd for a constructor works correctly", function () {
    cy.viewport(1655, 1080);
    cy.visit("/burger-react");
    cy.get(getIngredient).last().as("draggedMainIngredient");
    cy.get(burgerConstructorSection).as("dropSection");

    cy.get("@draggedMainIngredient").trigger("dragstart");
    cy.get("@dropSection").trigger("drop");

    let title = null;
    cy.get("@draggedMainIngredient")
      .find("h4")
      .invoke("text")
      .then((text) => {
        title = text;
      });

    cy.get("@dropSection")
      .find(ingredientTitle)
      .first()
      .invoke("text")
      .then((text) => {
        expect(`${title} (верх)`).to.not.equal(text);
      });
    cy.get("@dropSection")
      .find('div[class^="burgerConstructor_inner"]')
      .find(ingredientTitle)
      .first()
      .invoke("text")
      .then((text) => {
        expect(title).to.equal(text);
      });
    cy.get("@dropSection")
      .find(ingredientTitle)
      .last()
      .invoke("text")
      .then((text) => {
        expect(`${title} (низ)`).to.not.equal(text);
      });
    cy.get("@draggedMainIngredient")
      .find('p[class^="counter__num"]')
      .invoke("text")
      .then((text) => expect("1").to.equal(text));
  });

  it("dnd for one ingredient added several times works correctly", function () {
    cy.viewport(1655, 1080);
    cy.visit("/burger-react");
    cy.get(getIngredient).last().as("draggedMainIngredient");

    cy.get(burgerConstructorSection).as("dropSection");

    cy.get("@draggedMainIngredient").trigger("dragstart");
    cy.get("@dropSection").trigger("drop");

    cy.get("@draggedMainIngredient").trigger("dragstart");
    cy.get("@dropSection").trigger("drop");

    cy.get("@draggedMainIngredient")
      .find('p[class^="counter__num"]')
      .invoke("text")
      .then((text) => expect("2").to.equal(text));
  });
});
