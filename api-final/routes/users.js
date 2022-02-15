var express = require('express');
var router = express.Router();
const controller = require('../controllers/users');
const jwt = require('express-jwt');
const uploadUser = require('../utilities/upload/multerUsers');

require('dotenv').config();

router
// .get('/', controller.getUsers)
      .get('/', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }),  controller.myProfile)
      .put('/update',  jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.editMyProfile)
      .put('/myprofile/image',uploadUser.single('image'), jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.editImage)
      .post('/register', controller.register)
      .post('/login', controller.login)
      .post('/logout', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.logout)
      
      
module.exports = router;


// getById my profile

