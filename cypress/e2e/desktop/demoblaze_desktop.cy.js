import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';
import { CartPage } from '../../page-objects/CartPage';

const home = new HomePage();
const product = new ProductPage();
const cart = new CartPage();

describe('Demoblaze pruebas en Desktop', () => {
  beforeEach(() => {
    // Fijar tamaño desktop
    cy.viewport(1280, 720);
    // Ir a la home
    home.visitHome();
  });

  it('1) Navegar a categoría Laptops y validar listado', () => {
    home.clickCategory('Laptops');
    // Validamos que en la lista de productos aparezca una laptop, ejemplo: "Sony vaio i5"
    cy.get('.card-title').should('contain.text', 'Sony vaio i5');
  });

  it('2) Seleccionar un producto y añadir al carrito', () => {
    home.clickCategory('Laptops');
    home.clickProductByName('Sony vaio i5');
    product.verifyProductTitle('Sony vaio i5');
    product.addToCart();
    home.goToCart();
    cart.verifyProductInCart('Sony vaio i5', '790');
  });

  it('3) Eliminar producto del carrito', () => {
    home.clickCategory('Laptops');
    home.clickProductByName('Sony vaio i5');
    product.addToCart();
    home.goToCart();
    cart.deleteProduct('Sony vaio i5');
    
    // Verificar que ya no aparezca el texto “Sony vaio i5” en el tbody
    cy.get('#tbodyid').should('not.contain', 'Sony vaio i5');
  });
});
