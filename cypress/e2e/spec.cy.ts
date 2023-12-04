describe('Movies App', () => {
  it('Buscar Película en el Listado de películas', () => {
    cy.visit('http://localhost:4200/home');
    cy.get('.form-control').type('Sonic');
    cy.get('.btn').click();
    cy.contains('Sonic');
  });
});
describe('Movies App', () => {
  it('Consultar detalle de película', () => {
    cy.visit('http://localhost:4200/home');
    cy.get('.form-control').type('Sonic');
    cy.get('.btn').click();
    cy.contains('Sonic');
    cy.get(':nth-child(2) > .card > a > .card-img-top').click();
    cy.contains('Sonic')
  });
});
describe('Movies App', () => {
  it('Escribir una reseña de una película', () => {
    cy.visit('http://localhost:4200/home');
    cy.get('.form-control').type('Sonic');
    cy.get('.btn').click();
    cy.contains('Sonic');
    cy.get(':nth-child(2) > .card > a > .card-img-top').click();
    cy.contains('Sonic')
    cy.get('#review').type('Excelente película, los personajes son muy buenos, la trama es atrapante, los escenarios son muy lúcidos. Me encantó y la recomiendo mucho');
    cy.get('.mb-4 > .btn').click();
    cy.contains('Reseña agregada exitosamente');
  });
});
describe('Movies App', () => {
  it('Crear una nueva película', () => {
    cy.visit('http://localhost:4200/home');
    cy.get('#moviesDropdown').click();
    cy.get(':nth-child(4) > .dropdown-menu > :nth-child(3) > .dropdown-item').click();
    cy.contains('Crear Película');
    cy.get('#titulo').type('Sonic 3: El regreso de Robotnik');
    cy.get('#director').type('Jeff Fowler');
    cy.get('#genero').select('Acción');
    cy.get('#añoLanzamiento').type('2022');
    cy.get('#sinopsis').type('Sonic y sus amigos deben detener a Robotnik de nuevo');
    cy.get('.mt-3').click();
    cy.contains('Película agregada correctamente');
  });
});
    
    
    
    