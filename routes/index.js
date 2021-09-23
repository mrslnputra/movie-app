const express = require('express')
const AuthController = require('../controllers/auth')
const ControlUser = require('../controllers/userControl')
const ControllerAdmin = require('../controllers/adminControl')

const router = express.Router()



router.get('/', ControlUser.findAll)/* jangan ada tombol buy */
// Regis
router.get('/registration', ControlUser.userForm)
router.post('/registration', ControlUser.userCreate)

// login
router.get('/login', AuthController.formLogin)
router.post('/login', AuthController.postLogin)



router.use(function (req, res, next) {
  console.log(req.session.user);
  if (!req.session.user) {
    res.redirect('/login')
  }else{
    next()
  }
})
// isLoggedInc
router.get('/home', ControlUser.findMovieLogin)/* boleh ada tombol login */
router.get('/my-purchase', ControlUser.findMyMovie)/* boleh ada tombol login */
router.get('/:movieId/buy', ControlUser.addTicket)
router.post('/:movieId/buy', ControlUser.createTicket)



router.use(function (req, res, next) {
  if (req.session.user.role !== 'admin') {
    res.redirect('/login')
  }else{
    next()
  }
})
// isAdmin
router.get('/addMovie', ControllerAdmin.addMovieForm)
router.post('/addMovie', ControllerAdmin.createMovie)
router.get('/editMovie/:id', ControllerAdmin.getEditMovie)
router.post('/editMovie/:id', ControllerAdmin.postEditMovie)

router.get('/logout', (req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
module.exports = router