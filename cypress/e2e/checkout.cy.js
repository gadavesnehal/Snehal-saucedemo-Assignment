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
    // POSITIVE TEST CASES – CHECKOUT FUNCTIONALITY
    // ==================================================

    it('TC_CHECKOUT_001 - Verify user can successfully complete checkout with single product', () => {
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
        // Verify cart page displays the correct product 
        cy.get('[data-test="inventory-item-name"]')
            .should('be.visible')
            .and('have.text', 'Sauce Labs Backpack');
        // Click on Checkout button to navigate to checkout-step-one page
        cy.get('[data-test="checkout"]').click();
        // Verify user is on checkout-step-one page
        cy.url().should('include', 'checkout-step-one.html');
        // Enter First Name, Last Name, Zip Code
        cy.get('[data-test="firstName"]').type('Snehal');
        cy.get('[data-test="lastName"]').type('Gadave');
        cy.get('[data-test="postalCode"]').type('411033');
        // Click on "Continue" button to navigate to checkout-step-two page
        cy.get('[data-test="continue"]').click();
        // Verify user is on checkout-step-two page
        cy.url().should('include', 'checkout-step-two.html');
        // Verify checkout-step-two page displays the correct product 
        cy.get('[data-test="inventory-item-name"]')
            .should('be.visible')
            .and('have.text', 'Sauce Labs Backpack');
        //Verify Payment Information value is displayed
        cy.get('[data-test="payment-info-value"]')
            .should('be.visible')
            .and('have.text', 'SauceCard #31337');
        // Verify Shipping Information value is displayed
        cy.get('[data-test="shipping-info-value"]')
            .should('be.visible')
            .and('have.text', 'Free Pony Express Delivery!');
        // Verify Price Total value is displayed
        cy.get('[data-test="total-label"]')
            .should('be.visible')
            .and('have.text', 'Total: $32.39');
        // Click on Finish button to navigate to checkout-complete page
        cy.get('[data-test="finish"]').click();
        // Verify user is on checkout-complete page
        cy.url().should('include', 'checkout-complete.html');
        // Verify checkout confirmation message is displayed
        cy.get('[data-test="complete-header"]')
            .should('be.visible')
            .and('have.text', 'Thank you for your order!');
        cy.get('[data-test="complete-text"]')
            .should('be.visible')
            .and('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

    it('TC_CHECKOUT_002 - Verify user can successfully complete checkout with multiple products', () => {
        //Add to cart the product "Sauce Labs Backpack"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
            .click();
        //Add to cart the product "Sauce Labs Bike Light"
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .should('be.visible')
            .click();
        // Click on cart icon to navigate to the cart page
        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .click();
        // Verify user is navigated to cart page
        cy.url().should('include', 'cart.html');
        // Verify cart page displays the correct products 
        cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
            .should('be.visible');
        cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bike Light')
            .should('be.visible');
        // Click on Checkout button to navigate to checkout-step-one page
        cy.get('[data-test="checkout"]').click();
        // Verify user is on checkout-step-one page
        cy.url().should('include', 'checkout-step-one.html');
        // Enter First Name, Last Name, Zip Code
        cy.get('[data-test="firstName"]').type('Snehal');
        cy.get('[data-test="lastName"]').type('Gadave');
        cy.get('[data-test="postalCode"]').type('411033');
        // Click on "Continue" button to navigate to checkout-step-two page
        cy.get('[data-test="continue"]').click();
        // Verify user is on checkout-step-two page
        cy.url().should('include', 'checkout-step-two.html');
        // Verify checkout-step-two page displays the correct products 
        cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
            .should('be.visible');
        cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bike Light')
            .should('be.visible');
        //Verify Payment Information value is displayed
        cy.get('[data-test="payment-info-value"]')
            .should('be.visible')
            .and('have.text', 'SauceCard #31337');
        // Verify Shipping Information value is displayed
        cy.get('[data-test="shipping-info-value"]')
            .should('be.visible')
            .and('have.text', 'Free Pony Express Delivery!');
        // Verify Price Total value is displayed
        cy.get('[data-test="total-label"]')
            .should('be.visible')
            .and('have.text', 'Total: $43.18');
        // Click on Finish button to navigate to checkout-complete page
        cy.get('[data-test="finish"]').click();
        // Verify user is on checkout-complete page
        cy.url().should('include', 'checkout-complete.html');
        // Verify checkout confirmation message is displayed
        cy.get('[data-test="complete-header"]')
            .should('be.visible')
            .and('have.text', 'Thank you for your order!');
        cy.get('[data-test="complete-text"]')
            .should('be.visible')
            .and('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

    it('TC_CHECKOUT_003 - Verify product details, Payment Information value, Shipping Information value, and Price Total value are displayed correctly on the Checkout Overview page', () => {
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
        // Verify cart page displays the correct product 
        cy.get('[data-test="inventory-item-name"]')
            .should('be.visible')
            .and('have.text', 'Sauce Labs Backpack');
        // Click on Checkout button to navigate to checkout-step-one page
        cy.get('[data-test="checkout"]').click();
        // Verify user is on checkout-step-one page
        cy.url().should('include', 'checkout-step-one.html');
        // Enter First Name, Last Name, Zip Code
        cy.get('[data-test="firstName"]').type('Snehal');
        cy.get('[data-test="lastName"]').type('Gadave');
        cy.get('[data-test="postalCode"]').type('411033');
        // Click on "Continue" button to navigate to checkout-step-two page (Checkout Overview page)
        cy.get('[data-test="continue"]').click();
        // Verify user is on checkout-step-two page (Checkout Overview page)
        cy.url().should('include', 'checkout-step-two.html');
        // Verify the checkout-step-two page (Checkout Overview page) displays the correct product details 
        cy.get('[data-test="inventory-item-name"]')
            .should('be.visible')
            .and('have.text', 'Sauce Labs Backpack');
        cy.get('[data-test="inventory-item-desc"]')
            .should('be.visible')
            .and('not.be.empty');
        cy.get('[data-test="inventory-item-price"]')
            .should('be.visible')
            .and('have.text', '$29.99');
        cy.get('[data-test="item-quantity"]')
            .should('be.visible')
            .and('have.text', '1');
        // Verify the checkout-step-two page (Checkout Overview page) displays the correct Payment Information value
        cy.get('[data-test="payment-info-value"]')
            .should('be.visible')
            .and('have.text', 'SauceCard #31337');
        // Verify the checkout-step-two page (Checkout Overview page) displays the correct Shipping Information value
        cy.get('[data-test="shipping-info-value"]')
            .should('be.visible')
            .and('have.text', 'Free Pony Express Delivery!');
        // Verify the checkout-step-two page (Checkout Overview page) displays the correct Price Total value 
        cy.get('[data-test="total-label"]')
            .should('be.visible')
            .and('have.text', 'Total: $32.39');
        // Click on Cancel button to navigate back to homepage
        cy.get('[data-test="cancel"]')
            .should('be.visible')
            .click();
        cy.url().should('include', '/inventory.html');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it('TC_CHECKOUT_004 - Verify page titles for checkout-step-one, checkout-step-two, and checkout-complete pages', () => {
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
        // Click on Checkout button to navigate to checkout-step-one page
        cy.get('[data-test="checkout"]').click();
        // Verify user is on checkout-step-one page
        cy.url().should('include', 'checkout-step-one.html');
        // Verify the page title for the checkout-step-one page
        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Checkout: Your Information');
        //On the checkout-step-one page, enter First Name, Last Name, and Zip Code
        cy.get('[data-test="firstName"]').type('Snehal');
        cy.get('[data-test="lastName"]').type('Gadave');
        cy.get('[data-test="postalCode"]').type('411033');
        // Click on "Continue" button to navigate to checkout-step-two page
        cy.get('[data-test="continue"]').click();
        // Verify user is on checkout-step-two page
        cy.url().should('include', 'checkout-step-two.html');
        // Verify the page title for the checkout-step-two page
        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Checkout: Overview');
        // Click on Finish button to navigate to checkout-complete page
        cy.get('[data-test="finish"]').click();
        // Verify user is on checkout-complete page
        cy.url().should('include', 'checkout-complete.html');
        // Verify the page title for the checkout-complete page
        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Checkout: Complete!');
    });

    it('TC_CHECKOUT_005 - Verify Cancel button on checkout-step-one page redirects to cart page', () => {
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
        // Click on Checkout button to navigate to checkout-step-one page
        cy.get('[data-test="checkout"]').click();
        // Verify user is on checkout-step-one page
        cy.url().should('include', 'checkout-step-one.html');
        //Click on the Cancel button to redirect back to the cart page.
        cy.get('[data-test="cancel"]').click();
        // Verify user is redirected to cart page
        cy.url().should('include', 'cart.html');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it('TC_CHECKOUT_006 - Verify Cancel button on checkout-step-two page redirects to homepage', () => {
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
        // Click on Checkout button to navigate to checkout-step-one page
        cy.get('[data-test="checkout"]').click();
        // Verify user is on checkout-step-one page
        cy.url().should('include', 'checkout-step-one.html');
        //On the checkout-step-one page, enter First Name, Last Name, and Zip Code
        cy.get('[data-test="firstName"]').type('Snehal');
        cy.get('[data-test="lastName"]').type('Gadave');
        cy.get('[data-test="postalCode"]').type('411033');
        // Click on Continue button to navigate to checkout-step-two page
        cy.get('[data-test="continue"]').click();
        // Verify user is on checkout-step-two page
        cy.url().should('include', 'checkout-step-two.html');
        //Click on the Cancel button to redirect to homepage
        cy.get('[data-test="cancel"]').click();
        //Verify user is redirected to homepage
        cy.url().should('include', '/inventory.html');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it('TC_CHECKOUT_007 - Verify Back Home button on checkout-complete page redirects to homepage', () => {
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
        // Click on Checkout button to navigate to checkout-step-one page
        cy.get('[data-test="checkout"]').click();
        // Verify user is on checkout-step-one page
        cy.url().should('include', 'checkout-step-one.html');
        //On the checkout-step-one page, enter First Name, Last Name, and Zip Code
        cy.get('[data-test="firstName"]').type('Snehal');
        cy.get('[data-test="lastName"]').type('Gadave');
        cy.get('[data-test="postalCode"]').type('411033');
        // Click on Continue button to navigate to checkout-step-two page
        cy.get('[data-test="continue"]').click();
        // Verify user is on checkout-step-two page
        cy.url().should('include', 'checkout-step-two.html');
        // Click on Finish button to navigate to checkout-complete page
        cy.get('[data-test="finish"]').click();
        // Verify user is on checkout-complete page
        cy.url().should('include', 'checkout-complete.html');
        //Click on the Back Home button to redirect to homepage
        cy.get('[data-test="back-to-products"]').click();
        //Verify user is redirected to homepage
        cy.url().should('include', '/inventory.html');
    });

    it('TC_CHECKOUT_008 - Verify Continue button on checkout-step-one page redirects to checkout-step-two page', () => {
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
        // Click on Checkout button to navigate to checkout-step-one page
        cy.get('[data-test="checkout"]').click();
        // Verify user is on checkout-step-one page
        cy.url().should('include', 'checkout-step-one.html');
        //On the checkout-step-one page, enter First Name, Last Name, and Zip Code
        cy.get('[data-test="firstName"]').type('Snehal');
        cy.get('[data-test="lastName"]').type('Gadave');
        cy.get('[data-test="postalCode"]').type('411033');
        // Click on Continue button to navigate to checkout-step-two page
        cy.get('[data-test="continue"]').click();
        // Verify user is on checkout-step-two page
        cy.url().should('include', 'checkout-step-two.html');
        // Verify page title is "Checkout: Overview"
        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Checkout: Overview');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="cancel"]').click();
        cy.url().should('include', '/inventory.html');
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it('TC_CHECKOUT_009 - Verify Finish button on checkout-step-two page redirects to checkout-complete page', () => {
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
        // Click on Checkout button to navigate to checkout-step-one page
        cy.get('[data-test="checkout"]').click();
        // Verify user is on checkout-step-one page
        cy.url().should('include', 'checkout-step-one.html');
        //On the checkout-step-one page, enter First Name, Last Name, and Zip Code
        cy.get('[data-test="firstName"]').type('Snehal');
        cy.get('[data-test="lastName"]').type('Gadave');
        cy.get('[data-test="postalCode"]').type('411033');
        // Click on Continue button to navigate to checkout-step-two page
        cy.get('[data-test="continue"]').click();
        // Verify user is on checkout-step-two page
        cy.url().should('include', 'checkout-step-two.html');
        // Click on Finish button to navigate to checkout-complete page
        cy.get('[data-test="finish"]').click();
        // Verify user is on checkout-complete page
        cy.url().should('include', 'checkout-complete.html');
        //Verify Page title is "Checkout: Complete!"
        cy.get('[data-test="title"]')
            .should('be.visible')
            .and('have.text', 'Checkout: Complete!');
    });

    // ==================================================
    // NEGATIVE TEST CASES – CHECKOUT FUNCTIONALITY
    // ==================================================

    it('TC_CHECKOUT_010 - Verify error messages when mandatory fields are left blank on checkout-step-one page', () => {
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
        // Click on Checkout button to navigate to checkout-step-one page
        cy.get('[data-test="checkout"]').click();
        // Verify user is on checkout-step-one page
        cy.url().should('include', 'checkout-step-one.html');
        // Case 1: All fields blank
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'First Name is required');
        // Case 2: First Name blank
        cy.get('[data-test="lastName"]').type('Gadave');
        cy.get('[data-test="postalCode"]').type('411001');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'First Name is required');
        // Clear fields
        cy.get('[data-test="lastName"]').clear();
        cy.get('[data-test="postalCode"]').clear();
        // Case 3: Last Name blank
        cy.get('[data-test="firstName"]').type('Snehal');
        cy.get('[data-test="postalCode"]').type('411001');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Last Name is required');
        // Clear fields
        cy.get('[data-test="firstName"]').clear();
        cy.get('[data-test="postalCode"]').clear();
        // Case 4: Zip Code blank
        cy.get('[data-test="firstName"]').type('Snehal');
        cy.get('[data-test="lastName"]').type('Gadave');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Postal Code is required');
        // Cleanup: remove added product to reset cart state
        cy.get('[data-test="cancel"]').click();
        cy.url().should('include', 'cart.html');
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        // Verify cart is empty after cleanup
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it('TC_CHECKOUT_011 - Verify user can not access checkout-step-one page without login', () => {
        // Logout from the application
        cy.get('[id="react-burger-menu-btn"]')
            .should('be.visible')
            .click();
        cy.get('[data-test="logout-sidebar-link"]').click();
        // Verify user is redirected to login page
        cy.url().should('eq', 'https://www.saucedemo.com/');
        // Attempt to access checkout-step-one page directly without login
        cy.visit('https://www.saucedemo.com/checkout-step-one.html', { failOnStatusCode: false });
        // Verify user is redirected back to login page
        cy.url().should('eq', 'https://www.saucedemo.com/');
        // Verify error message is displayed
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain.text', "You can only access '/checkout-step-one.html' when you are logged in.");
    });

    it('TC_CHECKOUT_012 - Verify user can not access checkout-step-two page without login', () => {
        // Logout from the application
        cy.get('[id="react-burger-menu-btn"]')
            .should('be.visible')
            .click();
        cy.get('[data-test="logout-sidebar-link"]').click();
        // Verify user is redirected to login page
        cy.url().should('eq', 'https://www.saucedemo.com/');
        // Attempt to access checkout-step-two page directly without login
        cy.visit('https://www.saucedemo.com/checkout-step-two.html', { failOnStatusCode: false });
        // Verify user is redirected back to login page
        cy.url().should('eq', 'https://www.saucedemo.com/');
        // Verify error message is displayed
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain.text', "You can only access '/checkout-step-two.html' when you are logged in.");
    });

    it('TC_CHECKOUT_013 - Verify user can not access checkout-complete page without login', () => {
        // Logout from the application
        cy.get('[id="react-burger-menu-btn"]')
            .should('be.visible')
            .click();
        cy.get('[data-test="logout-sidebar-link"]').click();
        // Verify user is redirected to login page
        cy.url().should('eq', 'https://www.saucedemo.com/');
        // Attempt to access checkout-complete page directly without login
        cy.visit('https://www.saucedemo.com/checkout-complete.html', { failOnStatusCode: false });
        // Verify user is redirected back to login page
        cy.url().should('eq', 'https://www.saucedemo.com/');
        // Verify error message is displayed
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain.text', "You can only access '/checkout-complete.html' when you are logged in.");
    });
});