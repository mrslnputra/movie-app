'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seatNumber: {
        type: Sequelize.STRING
      },
      MovieId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Movies',
          key: 'id'
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('Tickets');
  }
};