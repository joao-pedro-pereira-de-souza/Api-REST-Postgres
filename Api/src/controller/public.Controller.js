const db = require('../config/database')

exports.FullAllRegisters = async (req , res) =>{

    try{

        const {rows} = await db.query('SELECT * FROM register');

        res.send({resuts:rows})

    }
    catch(err){
        console.log(err)

    } 

}

