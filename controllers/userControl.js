const { Movie, Profile, Ticket, User } = require('../models/index')
const { Op } = require('sequelize')


class ControlUser {
  static findAll(req, res) {
    let condition = {}
    if (req.query.search) {
      condition.where = {
        title: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    }

    Movie.findAll(condition)
      .then(data => {
        res.render('base', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static userForm(req, res) {
    res.render('regisForm')
  }


  static userCreate(req, res) {
    let { fullName, email, userName, password } = req.body
    User.create({
      userName: userName,
      password: password
    })
      .then(data => {
        User.findAll({
          where: {
            userName: userName
          }
        })
          .then(data => {
            Profile.create({
              fullName: fullName,
              email: email,
              UserId: data[0].id
            });
          })
        res.redirect('/login')
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          let errMessage = err.errors.map(error => error.message)
          if (!fullName) errMessage.push('Name cannot be empty!')
          if (!email) errMessage.push('Email cannot be empty!')

          res.send(errMessage)
        } else {
          res.send(err)
        }
      })
  }

  static findMovieLogin(req, res) {
    let user = req.session.user
    if(user === '')res.redirect('/login')
    let condition = {}
    if (req.query.search) {
      condition.where = {
        title: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    }
    Movie.findAll(condition)
      .then(data => {
        res.render('home', { data, user })
      })
      .catch(err => {
        res.send(err)
      })
  }


  static addTicket(req, res) {
    let id = +req.params.movieId
    res.render('addTicket', { id })
  }

  static createTicket(req, res) {
    let movieId = +req.params.movieId
    Movie.stockSet(movieId)
    Ticket.create({
      seatNumber: req.body.seatNumber,
      MovieId: movieId,
      UserId: req.session.user.id
    })
      .then(data => {
        res.redirect('/home')
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          let errMessage = err.errors.map(error => error.message)
          res.send(errMessage)
        } else {
          res.send(err)
        }
      })
  }

  static findMyMovie(req, res) {
    let id = +req.session.user.id
    Ticket.findAll({
      where: {
        UserId: id
      },
      include: {
        model: Movie
      }
    })
      .then(data => {
        res.render('myMovie', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

}



module.exports = ControlUser