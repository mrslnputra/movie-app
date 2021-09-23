const express = require('express')
const ControllerAdmin = require('../controllers/adminControl')
const AuthController = require('../controllers/auth')
const ControllerUser = require('../controllers/userControl')
const router = express.Router()



router.get('/', ControllerUser.findAllMovie)/* jangan ada tombol buy */
router.get('/home', ControllerUser.findAllMovie)


// Regis
router.get('/registration', ControllerUser.regisProfile)
router.post('/registration', ControllerUser.createProfile)

// login
router.get('/login', AuthController.formLogin)
router.post('/login', AuthController.postLogin)


router.use(function (req, res, next) {
  // console.log(req.session.user);
  if (!req.session.user) {
    const err = 'Login first!'
    res.redirect('/login')
  }else{
    next()
  }
})
// isLoggedInc
router.get('/movieList', ControllerUser.findAllMovie)/* boleh ada tombol login */
///////////////////////////////////////////////////////
router.get('/movieList/:movieId/buy', ControllerUser.buyTicket)
router.post('/movieList/:movieId/buy', ControllerUser.ticketCreate)
router.get('/movieList/myPurchase', ControllerUser.myMovieList)
//////////////////////////////////////////////////



router.use(function (req, res, next) {
  if (req.session.user.role !== 'admin') {
    const err = 'balik sana!'
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


module.exports = router