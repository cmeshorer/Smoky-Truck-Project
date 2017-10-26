var express = require('express');
var router = express.Router();
const validator = require('validator');
const nodemailer = require("nodemailer");

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
	res.render('menu', { 
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
	});
});

/* Validation du formulaire et envoi du mail à l'administrateur */
router.post('/submit', function(req, res, next) { // On fait une requête post au submit.
	// On vérifie les champs - Pour l'instant un seul champ est vérifié il faut voir comment cumuler les vérifications
	let error = '';
	if (validator.isEmpty(req.body.name)) { // Si le champ est vide on le renvoie sur la page contact.
		error = 'Veuillez renseigner votre nom';
		res.render('contact', { 
			title: 'Nous contacter - Smoky Truck',
			meta: 'Vous souhaitez nous contacter ? N\'hésitez pas à remplir le formulaire ci-dessous. A bientôt !',
			page: 'contact',
			error : error
		}); } else { // Sinon on envoie le mail contenant le message à l'administrateur.
		var transport = nodemailer.createTransport({
			host: "smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "282a3d165de31e",
				pass: "be3b011087f729"
			}
		});
		transport.sendMail({
			from: req.body.email,
			to: "supergrandma@yopmail.com",
			subject: "Coucou !",
			text: req.body.message,
			html: req.body.message
		}, (error, response) => {
			if(error){
				console.log(error);
			}else{
				res.redirect('/contact');
			}
		});	
	}
});

/* GET mentions */
router.get('/mentions', function(req, res, next) {
	res.render('mentions', { 
		title: 'Mentions légales - Smoky Truck',
		meta: 'Mentions légales du site Smoky Truck.' 
	} );
});

module.exports = router;