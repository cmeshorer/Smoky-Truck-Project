var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { 
  	title: 'Bienvenue sur le site Smoky Truck !',
  	meta: 'Smoky Truck is a foodtruck located in Paris since 2017. It embraces cuisine fusion where pizza is at the center of our creative work. Click to discover some pizza fusion...',
  	page: 'accueil'
  } );
});


router.get('/mentions', function(req, res, next) {
  res.render('mentions');
});

router.get('/error', function(req, res, next) {
  res.render('error');
});


router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/noustrouver', function(req, res, next) {
  res.render('lieux-hor');

});

module.exports = router;

