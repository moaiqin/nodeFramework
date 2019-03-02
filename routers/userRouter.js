const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');

Router.post('/addUser', userController.addUser);
Router.get('/getEmail', userController.getUserByMail);
Router.get('/getList', userController.getUserByName);

module.exports = Router;