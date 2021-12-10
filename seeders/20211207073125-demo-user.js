'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('user', [
			{
				username: 'Doe',
				email: 'example@example.com',
				password: 'test1',
				bio: null,
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('user', null, {});
	},
};
