const express = require('express')
const ControllerAdmin = require('../controllers/adminControl')
const router = express.Router()



router.get('/addMovie',ControllerAdmin.addMovieForm)
router.post('/addMovie',ControllerAdmin.createMovie)


router.get('/editMovie/:id',ControllerAdmin.getEditMovie)
router.post('/editMovie/:id',ControllerAdmin.postEditMovie)


module.exports = router