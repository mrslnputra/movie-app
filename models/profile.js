'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  Profile.init({
    fullName: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Name cannot be empty!'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Email cannot be empty!'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};