/// <reference types="Cypress" />

/**
 *  Test case to test the Sign up / Sign in Page.
 */

describe('Verifying Sign up / Sign In page details', () => {
	beforeEach(() => {
		cy.visit(Cypress.config().baseUrl, { timeout: 80000 });
	});

	const username = Cypress.env('dev_username');
	const password = Cypress.env('dev_password');

	it('Test Sign in and Login details page', () => {
		cy.verify_signup_url();
		cy.validate_signIn_btn();
		cy.verify_conduit_banner();
		cy.validate_signUp_btn();
		cy.validate_home_btn();
		cy.click_signIn_link();
		cy.verify_login_url();
		cy.login(username, password);
	});



	it('Test if user is able to login and logout successfully ', () => {
		cy.login(username, password);
		cy.contains('Settings').should('be.visible').click({ force: true });
		cy.verify_settings_page();
		cy.logout();
		cy.verify_signup_url();
	});
});
