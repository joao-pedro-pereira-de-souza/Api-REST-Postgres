const db = require('../config/database')
const bcrypt = require('bcryptjs')
const GetHashPassword = require('./password.geration')

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

        const hash = await GetHashPassword.HashPassword(user_password)

        await db.query(`INSERT INTO register 
                           (user_name, user_email, user_password, user_description, user_phone)
                         VALUES
                           ($1, $2, $3, $4, $5)` ,
                                        
                            [user_name, user_email, hash, user_description, user_phone])

        res.send({resuts: [user_name, user_email, hash , user_description, user_phone]})

    }
    catch(err){

        console.log(err)

        res.status(400).send({error: err})

    }

}

exports.SignInRegister = async (req, res) =>{

    const {user_email, user_password} = req.body;

    try{


        if(user_email.search('@') == -1){

            return res.status(400).send({error: 'Email mal formatado'}) 

        }

        let  {rows} = await db.query('SELECT * FROM register WHERE user_email=$1' , [user_email])

        if(!rows[0]){

            return res.status(400).send({error: 'Usuário não encontrado'}) 

        }

        if(!await bcrypt.compare(user_password , rows[0].user_password)){

            return res.status(400).send({error: 'Senha incorreta'})

        }

        rows[0].user_password = undefined;

        res.send({resuts: rows[0]})

    }
    catch(err){

        console.log(err)

        res.status(400).send({error: err})

    }

}
