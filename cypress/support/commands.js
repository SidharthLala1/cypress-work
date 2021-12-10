/// <reference types="Cypress" />

const { url } = require('inspector');
const editorPage = require('../locators/EditorPage.json');
const loginPage = require('../locators/LoginPage.json');
const settingsPage = require('../locators/SettingPage.json');

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	//expect(err.message).to.include('uncaught errors from the application');
	return false;
});

/**
 * Login function which can be used all across the test cases to avoid code repetition
 */
Cypress.Commands.add('login', (username, password) => {
	cy.clearCookies();
	cy.clearLocalStorage();
	cy.get(loginPage.signinBtn).click({ force: true });
	cy.get(loginPage.email, { timeout: 60000 })
		.click({ force: true })
		.type(username);
	cy.get(loginPage.password, { timeout: 60000 })
		.click({ force: true })
		.type(password);
	cy.get(loginPage.signIn_Btn).should('be.visible').click({ force: true });
	cy.get(loginPage.sign_message)
		.should('be.visible')
		.should('have.text', 'Logged in successfully');
});

/**
 *  Functions to verify different page url's
 */

Cypress.Commands.add('verify_signup_url', () => {
	cy.url().should('deep.equal', `${Cypress.config().baseUrl}`, {
		timeout: 60000,
	});
});

Cypress.Commands.add('verify_login_url', () => {
	cy.url().should('deep.equal', `${Cypress.config().baseUrl}login`, {
		timeout: 60000,
	});
});

Cypress.Commands.add('validate_signIn_btn', () => {
	cy.get(loginPage.signinBtn).should('exist').should('have.text', 'Sign in');
});

Cypress.Commands.add('validate_signUp_btn', () => {
	cy.get(loginPage.signupBtn).should('exist').should('have.text', 'Sign up');
});

Cypress.Commands.add('validate_home_btn', () => {
	cy.get(loginPage.homeBtn).should('exist').should('have.text', 'Home');
});

Cypress.Commands.add('verify_conduit_banner', () => {
	cy.get(loginPage.banner).should('exist');
	cy.get(loginPage.banner).should('exist').should('have.text', 'conduit');
	cy.get(loginPage.banner_text)
		.should('exist')
		.should('have.text', 'A place to share your knowledge.');
});

Cypress.Commands.add('click_signIn_link', () => {
	cy.get(loginPage.signinBtn)
		.should('exist')
		.should('have.text', 'Sign in')
		.click();
});

Cypress.Commands.add('click_signupBtn', () => {
	cy.get(loginPage.signupBtn).should('exist').click();
});

Cypress.Commands.add('click_new_article', () => {
	cy.get(editorPage.new_article).should('exist').click({ force: true });
});

Cypress.Commands.add('verify_editor_page', () => {
	cy.url().should('deep.equal', `${Cypress.config().baseUrl}editor`, {
		timeout: 60000,
	});
});

Cypress.Commands.add('verify_settings_page', () => {
	cy.url().should('deep.equal', `${Cypress.config().baseUrl}settings`, {
		timeout: 60000,
	});
});

Cypress.Commands.add('click_logout', () => {
	cy.contains('Log Out').should('exist').click({ force: true });
});

Cypress.Commands.add('enter_article_title', (article_title) => {
	cy.get(editorPage.article_title)
		.should('exist')
		.click({ force: true })
		.type(article_title);
});

Cypress.Commands.add('enter_article_about', (article_about) => {
	cy.get(editorPage.article_about)
		.should('exist')
		.click({ force: true })
		.type(article_about);
});

Cypress.Commands.add('enter_article_markdown', (article_markdown) => {
	cy.get(editorPage.article_markdown)
		.should('exist')
		.click({ force: true })
		.type(article_markdown);
});

Cypress.Commands.add('enter_article_tags', (article_tags) => {
	cy.get(editorPage.article_tags)
		.should('exist')
		.click({ force: true })
		.type(article_tags);
});

Cypress.Commands.add('click_publish_btn', () => {
	cy.get(editorPage.publish_article).should('exist').click({ force: true });
	cy.get(loginPage.sign_message)
		.should('be.visible')
		.should('have.text', 'Created successfully');
});

Cypress.Commands.add('verify_article_title', (article_title) => {
	cy.get(editorPage.added_title)
		.should('exist')
		.should('have.text', article_title);
});
Cypress.Commands.add('verify_article_about', (article_about) => {
	cy.get(editorPage.added_about)
		.should('exist')
		.should('have.text', article_about);
});
Cypress.Commands.add('verify_article_markdown', (article_markdown) => {
	cy.get(editorPage.added_markdown)
		.should('exist')
		.should('have.text', article_markdown);
});
Cypress.Commands.add('verify_article_tags', (article_tags) => {
	cy.get(editorPage.added_tags)
		.should('exist')
		.should('have.text', article_tags);
});

Cypress.Commands.add('delete_article', () => {
	cy.get(editorPage.delete_article_btn)
		.eq(1)
		.should('exist')
		.click({ force: true });
});

Cypress.Commands.add('verify_article_deleted_successfully', () => {
	cy.get(editorPage.article_delete_message)
		.should('be.visible')
		.should('have.text', 'Deleted successfully');
});

Cypress.Commands.add('update_profile_url', (url) => {
	cy.get(settingsPage.profile_picture).should('be.visible').type(url);
});
Cypress.Commands.add('update_profile_username', (new_username) => {
	cy.get(settingsPage.username).should('be.visible').clear().type(new_username);
});
Cypress.Commands.add('update_profile_bio', (bio) => {
	cy.get(settingsPage.bio).should('be.visible').type(bio);
});

Cypress.Commands.add('verify_username', () => {
	cy.get(settingsPage.email_input).should('be.visible');
});

Cypress.Commands.add('update_profile_password', (password) => {
	cy.get(settingsPage.password_input).should('be.visible').type(password);
});

Cypress.Commands.add('update_profile', () => {
	cy.get(settingsPage.update_settings_btn)
		.should('exist')
		.should('have.text', ' Update Settings ')
		.click({ force: true });

	cy.get(settingsPage.profile_message)
		.should('be.visible')
		.should('have.text', 'Updated successfully');
});

Cypress.Commands.add('logout', () => {
	cy.get(settingsPage.logout_btn)
		.should('be.visible')
		.should('have.text', ' Or click here to logout. ')
		.click({ force: true });
});
