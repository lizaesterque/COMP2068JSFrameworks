const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

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