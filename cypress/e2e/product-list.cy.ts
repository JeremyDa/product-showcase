/// <reference types="cypress" />

describe('Product List', () => {
  beforeEach(() => {
    cy.visit('/');
    // 等待API加载
    cy.intercept('GET', 'https://fakestoreapi.com/products').as('getProducts');
  });

  it('should display product list', () => {
    cy.wait('@getProducts');
    cy.get('.product-item').should('have.length.greaterThan', 0);
  });

  it('should show product details when clicking a product', () => {
    cy.wait('@getProducts');
    cy.get('.product-item').first().click();
    cy.get('.product-detail').should('be.visible');
    cy.get('.product-detail .title').should('not.be.empty');
    cy.get('.product-detail .price').should('not.be.empty');
  });

  it('should close product details when clicking close button', () => {
    cy.wait('@getProducts');
    cy.get('.product-item').first().click();
    cy.get('.close-button').click();
    cy.get('.product-detail').should('not.be.visible');
  });

}); 