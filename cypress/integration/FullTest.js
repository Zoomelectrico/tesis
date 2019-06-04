describe('Full App Test', function() {
  it('successfully loads', function() {
    cy.visit('/') // change URL to match your dev URL
  });
  it('Go to Login', function () {
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('jose.quevedo@correo.unimet.edu.ve');
    cy.get('input[name="password"]').type('12345678');
    cy.get('button#btnLogin').click().pause();
  });
  it('Wrong Password', function () {
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('jose.quevedo@correo.unimet.edu.ve');
    cy.get('input[name="password"]').type('123456789');
    cy.get('button#btnLogin').click().pause();
  })
  it('Go to Profile and Update', function () {
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('jose.quevedo@correo.unimet.edu.ve');
    cy.get('input[name="password"]').type('12345678');
    cy.get('button#btnLogin').click();
    cy.get('#Perfil').click()
    cy.get('input[name="lastName"]').clear().type('Quevedo G');
    cy.get('button#btnUpdate').click().pause();
  });
  it('Go to Postulation & create Electoral Group', function () {
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('jose.quevedo@correo.unimet.edu.ve');
    cy.get('input[name="password"]').type('12345678');
    cy.get('button#btnLogin').click();
    cy.get('#Postular').click().pause();
  });
  it('Can vote', function () {
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('jose.quevedo@correo.unimet.edu.ve');
    cy.get('input[name="password"]').type('12345678');
    cy.get('button#btnLogin').click();
    cy.get('#Votar').click().pause();
  });
});
