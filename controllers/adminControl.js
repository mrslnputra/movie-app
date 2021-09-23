const { Movie, Profile, Ticket, User } = require('../models/index');
const {Op} = require('sequelize')

class ControllerAdmin {
  static addMovieForm(req, res) {
    res.render('addMovie')
  }
  static createMovie(req, res) {
    let { title, duration, genre, urlImage } = req.body
    Movie.create({
      title: title,
      duration: duration,
      urlImage: urlImage,
      genre: genre
    })
      .then(data => {
        console.log(data);
      })
  }

  static getEditMovie(req, res) {
    let id = +req.params.id
    Movie.findByPk(id)
      .then(data => {
        // console.log(data);
        res.render('editMovie', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }


  static postEditMovie(req, res) {
    let id = +req.params.id
    let { title, duration, genre, urlImage } = req.body
    // console.log(title);
    Movie.update({
      title: title,
      duration: duration,
      urlImage: urlImage,
      genre: genre
    }, {
      where: {
        id: id
      }
    })
    .then(data=>{
      res.send(data)
    })

  }



}



module.exports = ControllerAdmin