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
	const url = 'www.google.com';
	const new_username = 'sid_test';
	const bio = 'testing user';
	const new_password = 'test1';

	it('Test if user is able to login and logout successfully ', () => {
		cy.login(username, password);
		cy.contains('Settings').should('be.visible').click({ force: true });
		cy.verify_settings_page();
		cy.update_profile_url(url);
		cy.update_profile_username(new_username);
		cy.update_profile_bio(bio);
		cy.verify_username();
		cy.update_profile_password(new_password);
		cy.update_profile();
	});
});
