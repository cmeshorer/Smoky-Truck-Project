var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
		title: 'Bienvenue sur le site du Smoky Truck !',
		meta: 'Depuis 2017, notre food truck vous propose de déguster de délicieuses pizzas aux 4 coins de la capitale. Venez régaler vos papilles !',
		page: 'accueil'
	} );
});

/* GET menu page */
router.get('/menu', function(req, res, next) {
	res.render('Menu', { 
		title: 'Notre menu - Smoky Truck',
		meta: 'Venez découvrir les délicieuses pizzas du Smoky Truck. Notre food truck vous propose également des entrées et desserts pour ravir toutes les papilles.',
		page: 'menu'
	} );
});

/* GET nous trouver */
router.get('/lieux-hor', function(req, res, next) {
	res.render('lieux-hor', { 
		title: 'Nous trouver - Smoky Truck',
		meta: 'Le Smoky Truck est présent dans différents lieux parisiensle midi et le soir. Consultez notre calendrier et notre carte : nous sommes forcément pas loin de chez vous !',
		page: 'lieux-hor'
	} );
});

/* GET nous contacter */
router.get('/contact', function(req, res, next) {
	res.render('contact', { 
		title: 'Nous contacter - Smoky Truck',
		meta: 'Vous souhaitez nous contacter ? N\'hésitez pas à remplir le formulaire ci-dessous. A bientôt !',
		page: 'contact'
	} );
});

/* GET mentions */
router.get('/mentions', function(req, res, next) {
	res.render('mentions', { 
		title: 'Mentions légales - Smoky Truck',
		meta: 'Mentions légales du site Smoky Truck.' 
	} );
});

module.exports = router;