const express = require('express')
const controller = require('../controller/public.Controller')
const router = express.Router();

router.get('/register' , controller.FullAllRegisters)
router.get('/register/:id' , controller.SelectByIdRegister)
router.post('/register' , controller.InsertIntoRegister)

module.exports = app => app.use('/public' , router)