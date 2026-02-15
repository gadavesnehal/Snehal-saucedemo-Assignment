/// <reference types="cypress" />

describe("Cart Tests", () => {

    beforeEach(() => {
        // Navigate to the application and perform login
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        // Verify user is on homepage
        cy.url().should('include', '/inventory.html');
    });

    // ==================================================
    // POSITIVE TEST CASES – CART FUNCTIONALITY
    // ==================================================

    it("TC_CART_001 - Verify single product can be added to the cart from homepage", () => {
        // Verify the product "Sauce Labs Backpack" is displayed on the homepage
        cy.contains('Sauce Labs Backpack').should('be.visible');
        // Click "Add to cart" button for "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        // Verify button text for "Sauce Labs Backpack" changes from "Add to cart" to "Remove"
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
        //Verify cart badge count increases to 1
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '1');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');

    });

    it("TC_CART_002 - Verify product is removed from cart by clicking Remove button on homepage", () => {
        // Click "Add to cart" button for "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        // Verify button text for "Sauce Labs Backpack" changes from "Add to cart" to "Remove"
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
        //Verify cart badge count increases to 1
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '1');
        // Click on “Remove” button for the same product
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify “Add to cart” button is displayed again
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
            .and('have.text', 'Add to cart');
        // Verify cart badge is no longer displayed
        cy.get('[data-test="shopping-cart-badge"]')
            .should('not.exist');
    });

    it("TC_CART_003 - Verify multiple products can be added to the cart from homepage", () => {
        // Click on “Add to cart” button for product "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
            .click();
        // Click on “Add to cart” button for product "Sauce Labs Bike Light"
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .should('be.visible')
            .click();
        // Verify button text changes from "Add to cart" to "Remove" for both products
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('be.visible');
        // Verify that the cart badge count increases to 2
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '2');
        // Cleanup: remove added products to reset cart state
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it("TC_CART_004 - Verify cart page displays correct product details", () => {
        //Add to cart the product "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
            .click();
        // Click on cart icon to navigate to the cart page
        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .click();
        // Verify user is navigated to cart page
        cy.url().should('include', 'cart.html');
        // Verify product name is displayed correctly
        cy.get('[data-test="inventory-item-name"]')
            .should('be.visible')
            .and('have.text', 'Sauce Labs Backpack');
        // Verify product description is displayed
        cy.get('[data-test="inventory-item-desc"]')
            .should('be.visible')
            .and('not.be.empty');
        // Verify product price is displayed correctly
        cy.get('[data-test="inventory-item-price"]')
            .should('be.visible')
            .and('have.text', '$29.99');
        // Verify product quantity is displayed and equals 1
        cy.get('[data-test="item-quantity"]')
            .should('be.visible')
            .and('have.text', '1');
        // Verify Remove button is visible for the product
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();;
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it("TC_CART_005 - Verify Remove button works on cart page", () => {
        //Add to cart the product "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
            .click();
        // Verify cart badge count increases to 1
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '1');
        // Click on cart icon to navigate to the cart page
        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .click();
        // Verify user is navigated to cart page
        cy.url().should('include', 'cart.html');
        // Click on the “Remove” button for the added product
        cy.get('[data-test="remove-sauce-labs-backpack"]')
            .should('be.visible')
            .click();
        // Verify product is removed from the cart page
        cy.get('[data-test="inventory-item-name"]')
            .should('not.exist');
        // Verify cart badge is no longer displayed
        cy.get('[data-test="shopping-cart-badge"]')
            .should('not.exist');
    });

    it("TC_CART_006 - Verify user is redirected back to homepage by clicking Continue Shopping button on cart page", () => {
        // Add to cart the product "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
            .click();
        // Click on the cart icon to navigate to the cart page
        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .click();
        // Verify user is navigated to cart page
        cy.url().should('include', 'cart.html');
        // Click on the “Continue Shopping” button
        cy.get('[data-test="continue-shopping"]')
            .should('be.visible')
            .click();
        // Verify user is redirected back to homepage
        cy.url().should('include', 'inventory.html');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it("TC_CART_007 - Verify user is redirected to checkout page by clicking Checkout button on cart page", () => {
        // Add to cart the product "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
            .click();
        // Click on the cart icon to navigate to the cart page
        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .click();
        // Verify user is navigated to cart page
        cy.url().should('include', 'cart.html');
        // Click on the "Checkout" button on cart page
        cy.get('[data-test="checkout"]')
            .should('be.visible')
            .click();
        // Verify user is redirected to checkout page
        cy.url().should('include', 'checkout-step-one.html');
        // Redirect back to homepage to perform clean up step
        cy.get('[id="react-burger-menu-btn"]')
            .should('be.visible')
            .click();
        cy.get('[id="inventory_sidebar_link"]')
            .should('be.visible')
            .click();
        // Verify user is redirected back to homepage
        cy.url().should('include', 'inventory.html');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it('TC_CART_008 - Verify user is redirected back to cart page by clicking Cancel button on checkout page', () => {
        // Add to cart the product "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
            .click();
        // Click on the cart icon to navigate to the cart page
        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .click();
        // Verify user is navigated to cart page
        cy.url().should('include', 'cart.html');
        // Click on the "Checkout" button on cart page
        cy.get('[data-test="checkout"]')
            .should('be.visible')
            .click();
        // Verify user is redirected to checkout page
        cy.url().should('include', 'checkout-step-one.html');
        //Click on the "Cancel" button on checkout page.
        cy.get('[data-test="cancel"]')
            .should('be.visible')
            .click();
        // Verify user is redirected back to cart page
        cy.url().should('include', 'cart.html');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it('TC_CART_009 - Verify cart retains products after page refresh', () => {
        // Add to cart the product "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
            .click();
        //Verify cart badge count increases to 1
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '1');
        //Refresh the page
        cy.reload();
        // Verify cart badge count remains 1 after refresh.
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '1');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it('TC_CART_010 - Verify cart retains products when navigating between pages', () => {
        // Add to cart the product "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
            .click();
        //Verify cart badge count increases to 1
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '1');
        //Navigate to the cart page
        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .click();
        // Verify user is navigated to cart page
        cy.url().should('include', 'cart.html');
        // Click on the “Continue Shopping” button
        cy.get('[data-test="continue-shopping"]')
            .should('be.visible')
            .click();
        // Verify user is navigated back to homepage
        cy.url().should('include', 'inventory.html');
        // Verify cart badge count remains 1 after navigating between pages
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '1');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    // ==================================================
    // NEGATIVE TEST CASES – CART FUNCTIONALITY
    // ==================================================

    it('TC_CART_011 - Verify cart badge is not visible when no product is added', () => {
        // Do not add any product to cart
        // Verify that cart badge is not visible
        cy.get('[data-test="shopping-cart-badge"]')
            .should('not.exist');
    });

    it('TC_CART_012 - Verify removed product is not displayed on the cart page', () => {
        // Add to cart the product "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
            .click();
        //Verify cart badge count increases to 1
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text', '1');
        // Remove the same product from cart 
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart badge is no longer displayed
        cy.get('[data-test="shopping-cart-badge"]')
            .should('not.exist');
        // Open the cart page
        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .click();
        // Verify user is on cart page
        cy.url().should('include', 'cart.html');
        // Verify removed product is not displayed on the cart page
        cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
            .should('not.exist');
    });

    it('TC_CART_013 - Verify user can not access Cart page directly without login', () => {
        //Login to the application
        //Navigate to the Cart page and verify user is on Cart page.
        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .click();
        cy.url().should('include', 'cart.html');
        // Logout from the application
        cy.get('[id="react-burger-menu-btn"]')
            .should('be.visible')
            .click();
        cy.get('[data-test="logout-sidebar-link"]').click();
        // Verify user is redirected to login page
        cy.url().should('eq', 'https://www.saucedemo.com/');
        // Attempt to access cart page directly without login
        cy.visit('https://www.saucedemo.com/cart.html', { failOnStatusCode: false });
        // Verify user is redirected back to login page
        cy.url().should('eq', 'https://www.saucedemo.com/');
        // Verify error message is displayed
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain.text', "You can only access '/cart.html' when you are logged in.");
    });

    it('TC_CART_014 - Verify session expiration prevents access to Cart page', () => {
        //Login to the application
        //Navigate to the Cart page and verify user is on Cart page.
        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .click();
        cy.url().should('include', 'cart.html');
        //Clear session 
        cy.clearCookies();
        cy.clearLocalStorage();
        // Attempt to access the Cart page directly after session expiration
        cy.visit('https://www.saucedemo.com/cart.html', { failOnStatusCode: false });
        // Verify user is redirected to login page
        cy.url().should('eq', 'https://www.saucedemo.com/');
        // Verify error message is displayed
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain.text', "You can only access '/cart.html' when you are logged in.");
    });
});
