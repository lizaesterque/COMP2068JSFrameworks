var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});



router.get('/cooper', function(req, res, next) {
  res.render('cooper', { title: 'Cooper', description: 'Cooper, the golden puppy, is a sunshine wrapped in fur, with a wagging tail that spreads happiness everywhere he goes.' });
});

router.get('/russet', function(req, res, next) {
  res.render('russet', { title: 'Russet', description: 'Russet, the schnauzer, is a loyal companion with a distinct beard and eyebrows, known for his intelligence and spirited personality.' });
});

router.get('/sunny', function(req, res, next) {
  res.render('sunny', { title: 'Sunny', description: 'Sunny, the golden, is a radiant ball of energy, with a heart as bright as the sun and a boundless enthusiasm for life.' });
});

router.get('/lola', function(req, res, next) {
  res.render('lola', { title: 'Lola', description: 'Lola, the 10-year-old pug, is a seasoned companion with a heart of gold, known for her wrinkled face, charming snorts, and unwavering loyalty throughout the years.' });
});

module.exports = router;
