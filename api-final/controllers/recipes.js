const Recipe = require('../models/recipe');

module.exports = {
  allRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find({ user: req.user.id })

      res.send({
        error: false,
        message: 'List of all recipes from the database for you my dear',
        recipes: recipes
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      });
    }
  },


  allRecipesByCategory: async (req, res) => {
    try {

      const brunch = await Recipe.find({ 'category': 'Brunch' });
      const lunch = await Recipe.find({ 'category': 'Lunch' });
      const dinner = await Recipe.find({ 'category': 'Dinner' });
      const breakfast = await Recipe.find({ category: 'Breakfast' })

      const food = { breakfast, brunch, lunch, dinner };

      res.send({
        error: false,
        message: 'All recipes for category',
        breakfast: breakfast,
        brunch: brunch,
        lunch: lunch,
        dinner: dinner
      })
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      });
    }
  },

  getRecipeByID: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);

      res.send({
        error: false,
        message: `Details about recipe`,
        recipe: recipe
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      });
    }
  },

  createRecipe: async (req, res) => {
    try {
      if (req.file) {
        req.body.image = `images/recipes/${req.file.filename}`
      }
      else { req.body.image = "https://drmasley.com/wp-content/uploads/2019/09/104579996-buddha-bowl-salads-background.jpeg" }
      req.body.user = req.user.id;

      const recipe = await Recipe.create(req.body);

      res.status(201).send({
        error: false,
        message: `You created a new recipe!`,
        recipe: recipe
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      });
    }
  },

  updateRecipe: async (req, res) => {
    // console.log(req.file);
    try {
      const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
      res.send({
        error: false,
        message: 'Your recipe is updated',
        recipe: recipe
      })
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      })
    }
  },

  updateRecipeImage: async (req, res) => {
    // console.log('proveri');
    // console.log(req.file);
    // console.log(req.body);

    try {
      req.body.user = req.user.id
      req.body.image = `images/recipes/${req.file.filename}`
      const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
      res.send({
        error: false,
        message: 'The recipe was updated',
        recipe: recipe
      })
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      })
    }
  },



  deleteRecipe: async (req, res) => {
    try {
      await Recipe.findByIdAndDelete(req.params.id);

      res.send({
        error: false,
        message: `Recipe with id #${req.params.id} was deleted!`
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message,
      })
    }
  },

  view: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      await Recipe.findOneAndUpdate(req.params.id);

      recipe.visits += 1;
      recipe.save()

      res.send({
        error: false,
        message: `This recipe was visited `,
        recipe: recipe
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      });
    }
  },


  homePage: async (req, res) => {
    try {

      const limitNumber = 3;

      const FreshAndNewRecipes = await Recipe.find({}).sort({ createdAt: -1 }).limit(3);
      const MostPopularRecipes = await Recipe.find({}).sort({ visits: -1 }).limit(6);
      res.send({
        error: false,
        message: 'Home page',
        FreshAndNewRecipes: FreshAndNewRecipes,
        MostPopularRecipes: MostPopularRecipes
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      })
    }
  },



}