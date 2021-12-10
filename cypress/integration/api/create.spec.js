/// <reference types="cypress" />

describe('Users API', () => {
	beforeEach(() =>
		cy.request('http://localhost:3333/api/articles').as('articles')
	);

	it('returns a JSON data', () => {
		cy.get('@articles')
			.its('headers')
			.its('content-type')
			.should('include', 'text/html; charset=UTF-8');
	});

	it('return the correct status code', () => {
		cy.get('@articles').its('status').should('be.equal', 200);
	});
});
