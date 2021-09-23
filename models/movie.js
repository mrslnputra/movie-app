'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Movie.hasMany(models.Ticket)
      Movie.belongsToMany(models.User, {
        through: "Ticket"
      })
    }

    static stockSet(id) {
      return Movie.decrement({ stock: 1 }, {
        where: {
          id: id
        }
      })
    }


  };
  Movie.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty!'
        }
      }
    },
    duration: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Duration cannot be empty!'
        }
      }
    },
    urlImage: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Url cannot be empty!'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'genre cannot be empty!'
        }
      }
    },
    stock: DataTypes.INTEGER
  }, {
    hooks: {
      afterCreate: (movie) => {
        movie.stock = 30
      }
    },
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};