var express = require('express');
var router = express.Router();
const Recipe = require('../models/recipe');


router.get('/', async (req, res, next) => {
  const recipes = await Recipe.find({});
  console.log(recipes); // Log fetched recipes
  res.render('recipes', { recipes });   
});




// Route to handle displaying recipe details
router.get('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.render('inforecipes', { recipe });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// // Display the form for adding a new recipe
// router.get('/add', (req, res) => {
//   res.render('addRecipe'); // Assuming you have a view named 'addRecipe.hbs'
// });

module.exports = router;