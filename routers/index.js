const express = require('express');
const Router = express.Router();
const userRouter = require('./userRouter');
                                                                                             
Router.use('/user',userRouter)

module.exports = Router;