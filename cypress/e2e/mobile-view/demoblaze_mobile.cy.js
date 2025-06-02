import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';
import { CartPage } from '../../page-objects/CartPage';

const home = new HomePage();
const product = new ProductPage();
const cart = new CartPage();

describe('Demoblaze pruebas en Mobile View', () => {
  beforeEach(() => {
    // Simular iPhone X
    cy.viewport('iphone-x');
    home.visitHome();
  });

  it('1) Validar navegación responsive en categoría Monitors', () => {
    //cy.contains('Monitors').scrollIntoView().click();
    home.clickCategory('Monitors');    
    // En mobile el layout cambia; validamos que algún título de tarjeta muestre “Monitor”
    cy.get('.col-lg-4 .card-title').should('contain.text', 'monitor');
  });

  it('2) Añadir producto al carrito navegando en móvil', () => {

    // 2.1) Desplegamos menú + clic en categoría “Monitors”
    home.clickCategory('Monitors');

    // 2.2) Buscamos la tarjeta “Apple monitor 24” y la clickeamos
    cy.get('.card-title')
        .contains('Apple monitor 24')
        .scrollIntoView()
        .click();
        
    // 2.3) Validamos que el título de la página sea “Apple monitor 24”
    product.verifyProductTitle('Apple monitor 24');

    // 2.4) Damos click en “Add to cart” y capturamos el alert de confirmación
    product.addToCart();

    // 2.5) Vamos al carrito
    home.goToCart();

    // 2.6) Verificamos que el carrito contenga “Apple monitor 24” con precio “400”
    cart.verifyProductInCart('Apple monitor 24', '400');
  });

  it('3) Validar que se pueda hacer scroll para ver producto inferior', () => {
    // Ejemplo: buscar “Dell i7 8gb” y hacer scroll
    cy.contains('Sony Xperia Z5').scrollIntoView().should('be.visible');
  });
  
});
