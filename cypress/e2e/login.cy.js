/// <reference types="cypress" />

describe("Login Tests", () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  // ==================================================
  // POSITIVE TEST CASES – Valid Login Scenarios
  // ==================================================

  it("TC_LOGIN_001 - Verify login with valid credentials", () => {
    // Enter Valid Username
    cy.get('[data-test="username"]').type('standard_user');
    // Enter Valid Password
    cy.get('[data-test="password"]').type('secret_sauce');
    // Click on Login button
    cy.get('[data-test="login-button"]').click();
    // Verify user is redirected to inventory page after successful login
    cy.url().should('include', '/inventory.html');
  });

  it('TC_LOGIN_002 - Verify session persists after page reload', () => {
    // Enter Valid Username
    cy.get('[data-test="username"]').type('standard_user');
    // Enter Valid Password
    cy.get('[data-test="password"]').type('secret_sauce');
    // Click on Login button
    cy.get('[data-test="login-button"]').click();
    // Reload the page
    cy.reload();
    // Verify user remains on the inventory page after reload
    cy.url().should('include', '/inventory.html');
  });

  // ==================================================
  // NEGATIVE TEST CASES – Invalid Login Scenarios
  // ==================================================

  it('TC_LOGIN_003 - Verify login with invalid username', () => {
    // Enter Invalid Username
    cy.get('[data-test="username"]').type('Invalid_username');
    // Enter Valid Password
    cy.get('[data-test="password"]').type('secret_sauce');
    // Click on Login button
    cy.get('[data-test="login-button"]').click();
    // Verify error message is displayed for login attempt with invalid Username
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
  });

  it('TC_LOGIN_004 - Verify login with invalid password', () => {
    // Enter Valid Username
    cy.get('[data-test="username"]').type('standard_user');
    // Enter Invalid Password
    cy.get('[data-test="password"]').type('Invalid_password');
    // Click on Login button
    cy.get('[data-test="login-button"]').click();
    // Verify error message is displayed for login attempt with invalid Password
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
  });

  it('TC_LOGIN_005 - Verify login with both invalid credentials', () => {
    // Enter Invalid Username
    cy.get('[data-test="username"]').type('Invalid_username');
    // Enter Invalid Password
    cy.get('[data-test="password"]').type('Invalid_password');
    // Click on Login button
    cy.get('[data-test="login-button"]').click();
    // Verify error message is displayed for login attempt with invalid Username and Invalid Password
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
  });

  it('TC_LOGIN_006 - Verify login with empty username', () => {
    // Leave username field empty
    // Enter Valid Password
    cy.get('[data-test="password"]').type('secret_sauce');
    // Click on Login button
    cy.get('[data-test="login-button"]').click();
    // Verify validation error message for empty Username field
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username is required');
  });

  it('TC_LOGIN_007 - Verify login with empty password', () => {
    // Enter valid username
    cy.get('[data-test="username"]').type('Invalid_username');
    // Leave password field empty
    // Click on Login button
    cy.get('[data-test="login-button"]').click();
    // Verify validation error message for empty Password field
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Password is required');
  });

  it('TC_LOGIN_008 - Verify login with both username and password empty', () => {
    // Leave both username and password fields empty
    // Click on Login button
    cy.get('[data-test="login-button"]').click();
    // Verify validation error message is displayed for empty credentials
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username is required');
  });

  it('TC_LOGIN_009 - Verify username is case sensitive', () => {
    // Enter username in uppercase to validate case sensitivity
    cy.get('#user-name').type('STANDARD_USER');
    //Enter valid password
    cy.get('#password').type('secret_sauce');
    // Click on Login button
    cy.get('#login-button').click();
    // Verify error message is displayed due to username case mismatch
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
  });

  it('TC_LOGIN_010 - Verify password is case sensitive', () => {
    // Enter valid username
    cy.get('#user-name').type('standard_user');
    // Enter password in uppercase to validate case sensitivity
    cy.get('#password').type('SECRET_SAUCE');
    // Click on Login button
    cy.get('#login-button').click();
    // Verify error message is displayed due to password case mismatch
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service');
  });

  it('TC_LOGIN_011 - Verify login fails when username contains leading and trailing spaces', () => {
    // Enter username with leading and trailing spaces to validate input handling
    cy.get('#user-name').type(' standard_user ');
    // Enter valid password
    cy.get('#password').type('secret_sauce');
    // Click on Login button
    cy.get('#login-button').click();
    // Verify login fails due to leading and trailing spaces in username
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service');
  });

  it('TC_LOGIN_012 - Verify login fails when password contains leading and trailing spaces', () => {
    // Enter valid username
    cy.get('#user-name').type('standard_user');
    // Enter password with leading and trailing spaces to validate input handling
    cy.get('#password').type(' secret_sauce ');
    // Click on Login button
    cy.get('#login-button').click();
    // Verify login fails due to leading and trailing spaces in password
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service');

  });

  it('TC_LOGIN_013 - Verify error message disappears after valid login attempt', () => {
    // First attempt invalid login
    cy.get('#login-button').click();
    // Verify error message is displayed
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username is required');
    // Second attempt valid login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    // Verify error message disappears and user is redirected to inventory page after successful login
    cy.url().should('include', '/inventory.html');
  });

  it('TC_LOGIN_014 - Verify login with locked_out_user', () => {
    // Enter locked out username
    cy.get('[data-test="username"]').type('locked_out_user');
    // Enter valid password
    cy.get('[data-test="password"]').type('secret_sauce');
    // Click on Login button
    cy.get('[data-test="login-button"]').click();
    // Verify login fails and locked out user error message is displayed
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out.');
  });
});
