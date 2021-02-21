const express = require('express')
const POST = process.env.POST || 3000;

const app = express();
app.use(express.json())

require('./routers/index')(app)


app.listen(POST , () =>{
    console.log('Server Open')
})
