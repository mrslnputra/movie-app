const express = require('express')
const ControllerAdmin = require('../controllers/adminControl')
const AuthController = require('../controllers/auth')
const ControllerUser = require('../controllers/userControl')
const router = express.Router()



router.get('/', ControllerUser.findAllMovie)
router.get('/home', ControllerUser.findAllMovie)


// Regis
router.get('/registration', ControllerUser.regisProfile)
router.post('/registration', ControllerUser.createProfile)

// login
router.get('/login', AuthController.formLogin)
router.post('/login', AuthController.postLogin)


router.use(function (req, res, next) {
  if (!req.session.userId) {
    const err = 'Login first!'
    res.redirect('/login')
  }else{
    next()
  }
})

// isLoggedInc
router.get('/movieList', ControllerUser.findAllMovie)
router.get('/movieList/:movieId/buy', (req, res) => {
  res.send('============')
})
router.post('/movieList/:movieId/buy', (req, res) => {
  res.send('============')
})
router.get('/movieList/myPurchase', (req, res) => {
  res.send('============')
})



// isAdmin
router.get('/addMovie', ControllerAdmin.addMovieForm)
router.post('/addMovie', ControllerAdmin.createMovie)
router.get('/editMovie/:id', ControllerAdmin.getEditMovie)
router.post('/editMovie/:id', ControllerAdmin.postEditMovie)


module.exports = router