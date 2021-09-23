const User = require('../models/index').User;
const bcrypt = require('bcryptjs')


class AuthController{
  static formLogin(req,res){
    res.render('login')
  }
  static postLogin(req,res){
    let {userName, password} = req.body
    User.findOne({where:{userName}})
    .then(user=>{
      if(user){
        const isValidPass =  bcrypt.compareSync(password, user.password)
        if(isValidPass){
          console.log(req.session);
          
          return res.redirect('/movieList');
        }else{
          const err = "invalid username/password"
          return res.redirect(`login/?error=${err}`)
        }
      }else{
        const err = "invalid username/password"
        return res.redirect(`login/?error=${err}`)
      }
    })
    .catch(err=>{
      console.log(err);
      res.send(err);
    })
    // let salt = bcrypt.genSaltSync(8)
    
  }
}


module.exports = AuthController