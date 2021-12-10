/// <reference types="cypress" />

describe('Post API', () => {
	it('loads all the articles successfully', () => {
		cy.api({
			url:
				'http://localhost:3333/api/articles?offset=0&limit=10&orderBy=createdAt&orderType=desc',
		}).then((res) => {
			expect(res.status).to.equal(200);
			expect(res.body.length).to.equal(1142);
		});
	});

	it('loads the correct amount of articles based on author', () => {
		cy.api({
			url:
				'http://localhost:3333/api/articles?offset=0&limit=10&orderBy=createdAt&orderType=desc&author=sid_test',
		})
			.its('body')
			.should('have.length', 10);
	});

	it('should add a new article successfully', () => {
		cy.api({
			method: 'POST',
			url: 'http://localhost:3333/api/articles',
			body: {
				title: 'test',
				description: 'test',
				body: 'test',
				tagList: ['test'],
			},
		}).then((response) => {
			expect(response.status).to.equal(200);
			expect(response.body.id).to.equal(101);
		});
	});

	it('should delete a article successfully', () => {
		cy.api({
			method: 'DELETE',
			url: 'http://localhost:3333/api/articles/dfggfg-1639133902674',
		})
			.its('status')
			.should('be.equal', 200);
	});
});
