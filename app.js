const express = require('express')
const app = express()
const router = require('./routes')
const session = require('express-session')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.set('trust proxy', 1)
app.use(session({
  secret: 'whosyourdaddy',
  resave: false,
  saveUninitialized:true,
}))
app.use(router)
app.listen(port, (err, res) => {
  console.log(`listening to ${port}`)
})


// 