const {Pool}= require('pg')
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({

    host: process.env.HOST_DATABASE,
    port: process.env.PORT_DATABASE,
    database:process.env.DATABASE,
    user:process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,

})

pool.on('error' , (err) =>{
    console.log(err)
})

module.exports = {
    query: (req , res) => pool.query(req , res)
}