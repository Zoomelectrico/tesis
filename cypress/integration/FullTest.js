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
  it('Go to Profile and Update, demand electoral representative', function () {
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('jose.quevedo@correo.unimet.edu.ve');
    cy.get('input[name="password"]').type('12345678');
    cy.get('button#btnLogin').click();
    cy.get('#Perfil').click()
    cy.get('input[name="lastName"]').clear().type('Quevedo G');
    cy.get('button#btnUpdate').click()
    cy.get('button#btnRepresentative').click().pause();
  });
  it('Login as Admin and Accept Electoral Representative', function () {
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('ceu@unimet.edu.ve');
    cy.get('input[name="password"]').type('12345678');
    cy.get('button#btnLogin').click()
    cy.get('#Solicitudes').click()
    cy.get('button[data-id="5cf86ee6fb2367e819549a69"]').click().pause();
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
