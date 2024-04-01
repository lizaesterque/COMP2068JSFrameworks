var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

// routes to get recipes page 
const Recipe = require('../models/recipe');

router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.render('recipes', { recipes });
    } catch (err) {
        console.error('Error fetching recipes:', err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
