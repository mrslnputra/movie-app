const { User, Movie } = require('../models/index');
const bcrypt = require('bcryptjs')


class AuthController {
  static formLogin(req, res) {
    res.render('login')
  }
  static postLogin(req, res) {
    let { userName, password } = req.body
    User.findOne({ where: { userName } })
      .then(user => {
        if (user) {
          const isValidPass = bcrypt.compareSync(password, user.password)
          if (isValidPass) {
            req.session.user = { id: user.id, role: user.role, userName: user.userName }
            Movie.findAll()
              .then(data => {
                return res.redirect('/home');
              })
          } else {
            const err = "invalid username/password"
            return res.redirect(`login/?error=${err}`)
          }
        } else {
          const err = "invalid username/password"
          return res.redirect(`login/?error=${err}`)
        }
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      })

  }
}


module.exports = AuthController