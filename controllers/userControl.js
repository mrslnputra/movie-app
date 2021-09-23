const { Movie, Profile, Ticket, User } = require('../models/index');
const { Op } = require('sequelize')

class ControllerUser {
  static regisProfile(req, res) {
    res.render('registUser')
  }

  static createProfile(req, res) {
    let { fullName, email, userName, password } = req.body
    let id
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
      })
      .catch(err=>{
        res.send(err)
      })
  }


  static findAllMovie(req, res) {
    Movie.findAll()
      .then(data => {
        res.send(data)
      })
  }

  static createTicket(req,res){
    Ticket.create({
      
    })
  }
}

module.exports = ControllerUser