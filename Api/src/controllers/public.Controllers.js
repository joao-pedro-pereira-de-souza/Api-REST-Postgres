const db = require('../config/database')
const bcrypt = require('bcryptjs')
const GetHashPassword = require('./password.geration')

// ==> Rota responsável por listar todos os usuários (GET): localhost:3000/public/register
exports.FullAllRegisters = async (req , res) =>{

    try{

        const {rows} = await db.query('SELECT user_name , user_email, user_description FROM register');

        res.send({resuts:rows})

    }
    catch(err){
        console.log(err)

        res.status(400).send({error: err})

    } 

}
// ==> Rota responsável por encontrar um usuários pelo id (GET): localhost:3000/public/register/:id

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

// ==> Rota responsável por criar um novo usuários  (POST): localhost:3000/public/register
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

// ==> Rota responsável por Logar o usuário (POST): localhost:3000/public/signIn
exports.SignInRegister = async (req, res) =>{

    const {user_email, user_password} = req.body;

    try{

        // verifição de formaração de email (na variável não contém @ ? (-1 == 0 resultado)) 
        if(user_email.search('@') == -1){

            return res.status(400).send({error: 'Email mal formatado'}) 

        }
        // verificação se contém o email cadastrado no banco
        let  {rows} = await db.query('SELECT * FROM register WHERE user_email=$1' , [user_email])

        if(!rows[0]){// Caso não tenha

            return res.status(400).send({error: 'Usuário não encontrado'}) 

        }
        // métudo de comparação do bcrypt(senha criptografada)
        if(!await bcrypt.compare(user_password , rows[0].user_password)){

            return res.status(400).send({error: 'Senha incorreta'})

        }
        // Ocultando a senha antes de exibir
        rows[0].user_password = undefined;

        res.send({resuts: rows[0]})

    }
    catch(err){

        console.log(err)

        res.status(400).send({error: err})

    }

}
