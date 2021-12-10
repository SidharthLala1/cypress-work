/// <reference types="Cypress" />

/**
 *  Test case to test the Article creation and deletion.
 */

describe('Verifying Sign up / Sign In page details', () => {
	beforeEach(() => {
		cy.visit(Cypress.config().baseUrl, { timeout: 80000 });
	});
	const article_title = 'Welcome to the new world';
	const article_about = 'Comments about the new world';
	const article_markdown =
		'Shakespeare is often held up as a master neologist,because at least 500 words (including critic, swagger, lonely and hint) first appear in his works – but we have no way of knowing whether he personally invented them or was just transcribing things he’d picked up elsewhere.';
	const article_tags = 'World ';

	it('Test and create new article and verify if its published and deleted successfully ', () => {
		cy.login(username, password);
		cy.click_new_article();
		cy.verify_editor_page();
		cy.enter_article_title(article_title);
		cy.enter_article_about(article_about);
		cy.enter_article_markdown(article_markdown);
		cy.enter_article_tags(article_tags);
		cy.click_publish_btn();
		cy.verify_article_title(article_title);
		cy.verify_article_about(article_about);
		cy.verify_article_markdown(article_markdown);
		cy.verify_article_tags(article_tags);
		cy.delete_article();
		cy.verify_article_deleted_successfully();
	});
});
