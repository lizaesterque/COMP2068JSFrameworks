var express = require('express');
var router = express.Router();
const Recipe = require('../models/recipe');
const AuthenticationMiddleware = require ("../extension/authentication");

// Display the form for adding a new recipe
router.get('/add', AuthenticationMiddleware, (req, res) => {
  res.render('addRecipe'); 
});

// Handle form submission to add a new recipe
router.post('/add',AuthenticationMiddleware, async (req, res) => {
  try {
      const { title, ingredients, instructions, imageUrl } = req.body;
      // Create a new recipe in the database
      const newRecipe = new Recipe({
          title,
          ingredients: ingredients.split(',').map(ingredient => ingredient.trim()), // Assuming ingredients are comma-separated
          instructions,
          imageUrl
      });
      await newRecipe.save();
      res.redirect('/recipes'); // Redirect to the recipes page after adding the recipe
  } catch (error) {
      console.error('Error adding recipe:', error);
      res.status(500).send('Internal Server Error');
  }
});

router.get('/edit/:recipeId', AuthenticationMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.render('editRecipe', { recipe });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle form submission for editing a recipe
router.post('/edit/:recipeId',AuthenticationMiddleware, async (req, res) => {
  try {
    const { ingredients, instructions } = req.body;
    // Update the ingredients and instructions in the database
    await Recipe.findByIdAndUpdate(req.params.recipeId, {
      ingredients: ingredients.split('\n').map(ingredient => ingredient.trim()), 
      instructions
    });
    res.redirect('/recipes'); // Redirect to the recipes page after editing the recipe
  } catch (error) {
    console.error('Error editing recipe:', error);
    res.status(500).send('Internal Server Error');
  }
});


// POST route to handle recipe deletion
router.post('/delete/:recipeId', AuthenticationMiddleware, async (req, res) => {
  try {
    // Find the recipe by ID and delete it
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.redirect('/recipes'); // Redirect to the recipes page after deletion
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).send('Internal Server Error');
  }
});



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




module.exports = router;