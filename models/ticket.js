'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Movie)
      Ticket.belongsTo(models.User)
    }
  };
  Ticket.init({
    seatNumber: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Seat cannot be empty!'
        }
      }
    },
    MovieId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};