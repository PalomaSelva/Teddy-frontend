/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Customers', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input').type('Paloma');
    cy.get('button').click();
  });

  it('should be able to add new customer', () => {
    const nome = faker.person.fullName();
    const salario = faker.number.int({ min: 1000, max: 10000 }).toString();
    const valorEmpresa = faker.number
      .int({ min: 10000, max: 500000 })
      .toString();
    cy.visit('/customers');
    cy.get('ngx-spinner').should('not.exist');
    cy.get('#create-customer').click();
    cy.get('[data-cy="name"] input').type(nome);
    cy.get('[data-cy="salary"] input').type(salario);
    cy.get('[data-cy="salary"] input').type(salario);
    cy.get('[data-cy="companyValuation"] input').type(valorEmpresa);
    cy.contains('button', 'Salvar').click();

    // Verifica o modal de sucesso
    cy.contains('Sucesso').should('be.visible');
    cy.contains('Cliente criado com sucesso').should('be.visible');
    cy.contains('button', 'OK').click();

    // Verifica se o cliente foi adicionado
    cy.get('ul.pagination').then(($ul) => {
      const $pages = $ul.find('li.page-item:not(.disabled):not(:last-child)');
      if ($pages.length > 1) {
        cy.wrap($pages.last()).find('a.page-link').click();
      }
    });
    cy.get('app-card').should('contain', nome);
  });

  it('should be able to edit customer', () => {
    const nome = faker.person.fullName();
    const salario = faker.number.int({ min: 1000, max: 10000 }).toString();
    const valorEmpresa = faker.number
      .int({ min: 10000, max: 500000 })
      .toString();
    cy.visit('/customers');
    cy.get('ngx-spinner').should('not.exist');
    cy.get('app-card').first().find('button').eq(1).click();

    // Limpar inputs
    cy.get('[data-cy="name"] input').clear();
    cy.get('[data-cy="salary"] input').clear();
    cy.get('[data-cy="companyValuation"] input').clear();

    cy.get('[data-cy="name"] input').type(nome);
    cy.get('[data-cy="salary"] input').type(salario);
    cy.get('[data-cy="companyValuation"] input').type(valorEmpresa);

    cy.contains('button', 'Atualizar').click();

    // Verifica o modal de sucesso
    cy.contains('Sucesso').should('be.visible');
    cy.contains('Cliente atualizado com sucesso').should('be.visible');
  });

  it('should be able to delete customer', () => {
    cy.visit('/customers');
    cy.get('ngx-spinner').should('not.exist');
    cy.get('app-card').first().find('button').eq(2).click();

    cy.contains('Excluir cliente').should('be.visible');
    cy.contains('button', 'Excluir cliente').click();

    cy.contains('Cliente excluído com sucesso').should('be.visible');
  });
});
