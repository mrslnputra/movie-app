const { Movie, Profile, Ticket, User } = require('../models/index');
const { Op } = require('sequelize')

class ControllerUser {
  static regisProfile(req, res) {
    res.render('registUser')
  }

  static createProfile(req, res) {
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
        console.log(err);
        res.send(err)
      })
  }


  static findAllMovie(req, res) {
    console.log(req.session.user);
    Movie.findAll()
      .then(data => {
        res.render('home', { data} )
      })
  }

  static buyTicket(req, res) {
    let id = +req.params.movieId;
    res.render('buyTicket', { id })
  }

  static ticketCreate(req, res) {
    Ticket.create({
      seatNumber: req.body.seatNumber,
      MovieId: +req.params.movieId,
      UserId: req.session.user.id
    })
      .then(data => {
        res.redirect('/movieList')
      })
  }

  static myMovieList(req, res) {
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
        res.render('myMovie', {data})
      })
      .catch(err => {
        res.send(err)
      })
  }


}

module.exports = ControllerUser