const express = require('express')
const controller = require('../controller/public.Controller')
const router = express.Router();

router.get('/register' , controller.FullAllRegisters)

module.exports = app => app.use('/public' , router)