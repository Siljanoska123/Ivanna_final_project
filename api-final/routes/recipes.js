var express = require('express');
var router = express.Router();
const controller = require('../controllers/recipes');
const jwt = require('express-jwt');
require('dotenv').config();
const uploadRecipes = require('../utilities/upload/multerRecipe');



// router.use(jwt({ secret: 'shhhhhhared-secret', algorithms: ['HS256']}).unless({path: ['/token']}));
router.get('/all/myRecipes', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.allRecipes)
      .get('/category', controller.allRecipesByCategory)
      .get('/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.getRecipeByID)
      .get('/homepage',  controller.homePage)
      .post('/createRecipe', uploadRecipes.single('image'),  jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }),controller.createRecipe)
      .put('/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }),   controller.updateRecipe)
      .put('/:id/image', uploadRecipes.single('image'), jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }),   controller.updateRecipeImage)
      .delete('/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.deleteRecipe)
      .put('/stars/:id', controller.view)


module.exports = router;

