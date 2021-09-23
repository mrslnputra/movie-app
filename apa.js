const bcrypt = require('bcryptjs')
let password = 'papah'
const salt = bcrypt.genSaltSync(8)
const hash = bcrypt.hashSync(password, salt)
password  = hash
console.log(bcrypt.compareSync('papah',password));
console.log(password);