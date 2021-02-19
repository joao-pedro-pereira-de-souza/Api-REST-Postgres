const db = require('../config/database')

exports.FullAllRegisters = async (req , res) =>{

    try{

        const {rows} = await db.query('SELECT * FROM register');

        res.send({resuts:rows})

    }
    catch(err){
        console.log(err)

        res.status(400).send({error: err})

    } 

}

exports.SelectByIdRegister = async (req , res) =>{

    const id = req.params.id;

    try{

        const {rows} = await db.query('SELECT * FROM register WHERE user_id=$1' , [id])

        res.send({resuts:rows})

    }
    catch(err){

        console.log(err)

        res.status(400).send({error: err})

    }

}

exports.InsertIntoRegister = async (req , res) =>{

    const {user_name, user_email, user_password, user_description, user_phone} = req.body;

    try{

        await db.query(`INSERT INTO register 
                           (user_name, user_email, user_password, user_description, user_phone)
                         VALUES
                           ($1, $2, $3, $4, $5)` ,
                                        
                            [user_name, user_email, user_password, user_description, user_phone])

        res.send({resuts: [user_name, user_email, user_password, user_description, user_phone]})

    }
    catch(err){

        console.log(err)

        res.status(400).send({error: err})

    }

}