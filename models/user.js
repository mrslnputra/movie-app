'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Ticket)
      User.hasOne(models.Profile)
      User.belongsToMany(models.Movie, {
        through: "Ticket"
      })
    }
  };
  User.init({
    userName: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Username cannot be empty!'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Password cannot be empty!'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.role = 'user'
        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(instance.password, salt)
        console.log(hash);
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};