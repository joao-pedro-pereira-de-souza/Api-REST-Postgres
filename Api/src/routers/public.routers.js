const express = require('express')
const controller = require('../controllers/public.Controllers')
const router = express.Router();
// Routers
router.get('/register' , controller.FullAllRegisters)
router.get('/register/:id' , controller.SelectByIdRegister)
router.post('/register' , controller.InsertIntoRegister)
router.post('/signIn', controller.SignInRegister)
//

module.exports = app => app.use('/public' , router)