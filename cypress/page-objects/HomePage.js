export class HomePage {
  elements = {
    // Lista de categorías (por ejemplo: Phones, Laptops, Monitors)
    categoryList: () => cy.get('#itemc'),
    // Links de los títulos de cada tarjeta de producto
    productLinks: () => cy.get('.card-title a'),
    // Botón para ir al carrito
    cartButton: () => cy.get('#cartur'),
    // Botón hamburguesa que en móvil despliega el menú
    burgerButton: () => cy.get('button.navbar-toggler')
  };

  // Navegar a la home de demoblaze (https://demoblaze.com/)
  visitHome() {
    cy.visit('/');
  }

  // Hacer click en una categoría por nombre (“Laptops”, “Monitors”, etc.)
  clickCategory(categoryName) {
    // 1) Si el menú hamburguesa está visible (es Mobile View), lo abrimos:
    this.elements.burgerButton().then($btn => {
      if ($btn.is(':visible')) {
        $btn.click();
      }
    });

    // 2) Esperamos a que todos los <a id="itemc"> sean visibles en pantalla
    this.elements.categoryList()
      .should('be.visible')      // al menos uno
      .and('have.length.at.least', 1);

    // 3) Ahora sí, buscamos *entre todos* los "#itemc" el que contenga categoryName
    cy.contains('#itemc', categoryName)
      .scrollIntoView()          // (opcional) para asegurarnos de estar en pantalla
      .click();
  }

  // Hacer click en un producto específico por su nombre exacto
  clickProductByName(name) {
    this.elements.productLinks()
      .contains(name)
      .scrollIntoView()
      .click();
  }

  // Ir al carrito
  goToCart() {
    this.elements.cartButton().click();
  }
}
