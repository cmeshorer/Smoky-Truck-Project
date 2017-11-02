/* Appels des modules */
var express = require('express');
var router = express.Router();
const validator = require('validator');
const nodemailer = require("nodemailer");

const mysql = require('mysql');
const config = require('../config.js');

/* Connexion BDD */
const connection = mysql.createConnection(config);

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId); // Vérification de la connexion en console
});

/* GET login admin */
router.get('/login', function(req, res, next) {
  req.session.destroy();
  res.render('admin_login', {
    title: 'Login administrateur'
  });
});

/* POST login admin */
router.post('/login', function(req, res, next) {
	let fail = '';
	let login= req.body.login;
	let password = req.body.password;
	connection.query(`select * from user where username="${login}" and password="${password}"`, function (error, results, fields) {
	 	if (results.length==0) {
	 	 	res.render('admin_login', {
	 	 		fail: 'Identifiant et/ou mot de passe invalides'
	 	 	});
	 	} else {
	 	 	req.session.connected=true;
	 	 	res.redirect('/admin/index');
	 	}
	});
});

/* GET home page */
router.get('/', function(req, res, next) {  
  connection.query('select * from actus order by id desc limit 3;', function (error, results, fields) {
		if (error) {
			console.log(error);
		}
    res.render('index', {
      title: 'Accueil - Smoky Truck',
      meta: 'Depuis 2017, notre food truck vous propose de déguster de délicieuses pizzas aux 4 coins de la capitale. Venez régaler vos papilles !',
      page: 'accueil', 
      actus : results
    });
  });
});

/* GET actualités */
router.get('/actu-:id(\\d+)', function(req, res, next) {
  connection.query('SELECT * FROM actus where id = ?',[req.params.id] ,function (error, results, fields) {
		if (error) {
			console.log(error);
		}
    res.render('actu', {
      title: 'Actualités - Smoky Truck',
      meta: 'Retrouvez les dernières actualités du SMoky Truck',
      actus : results
    });
  });
});

/* GET menu */
router.get('/menu', function(req, res, next) {
	res.render('menu', { 
		title: 'Notre menu - Smoky Truck',
		meta: 'Venez découvrir les délicieuses pizzas du Smoky Truck. Notre food truck vous propose également des entrées et desserts pour ravir toutes les papilles.',
		page: 'menu'
	});
});

/* GET nous trouver */
router.get('/lieux-hor', function(req, res, next) {
	res.render('lieux-hor', { 
		title: 'Nous trouver - Smoky Truck',
		meta: 'Le Smoky Truck est présent dans différents lieux parisiens le midi et le soir. Consultez notre calendrier et notre carte : nous sommes forcément pas loin de chez vous !',
		page: 'lieux-hor'
	});
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
router.post('/submit', function(req, res, next) { // Requête post au submit.
	// Vérification du fomulaire avec validator.
	let error = '';
	if (validator.isEmpty(req.body.name)) {
		error = 'Veuillez renseigner votre nom';
		res.render('contact', { 
			title: 'Nous contacter - Smoky Truck',
			meta: 'Vous souhaitez nous contacter ? N\'hésitez pas à remplir le formulaire ci-dessous. A bientôt !',
			page: 'contact',
			error : error
		}); } if (validator.isEmpty(req.body.email)) {
		error = 'Veuillez renseigner votre e-mail';
		res.render('contact', { 
			title: 'Nous contacter - Smoky Truck',
			meta: 'Vous souhaitez nous contacter ? N\'hésitez pas à remplir le formulaire ci-dessous. A bientôt !',
			page: 'contact',
			error : error
		}); } if (validator.isEmpty(req.body.message)) {
		error = 'Veuillez renseigner un message';
		res.render('contact', { 
			title: 'Nous contacter - Smoky Truck',
			meta: 'Vous souhaitez nous contacter ? N\'hésitez pas à remplir le formulaire ci-dessous. A bientôt !',
			page: 'contact',
			error : error
		}); } else { // Si tout est OK on envoie sur Node mailer
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
			to: "smoky_truck@yopmail.com",
			subject: 'Cher Smoky Truck, ' + req.body.name + ' vous a envoyé un message depuis le site.',
			text: 'Nom : ' + req.body.name + '\n' + 'Mail : ' + req.body.email + '\n' + 'Message : ' + req.body.message,
			html: '<p>' + '<b>' + 'Nom : ' + '</b>'+ req.body.name + '<p>' + '<b>' + 'Mail : ' + '</b>' + req.body.email + '<p>' + '<b>' + 'Message : ' + '</b>' + req.body.message + '</p>'
		}, (error, response) => {
			if(error){
				console.log(error);
			} else{
				res.render('contact-OK');
			}
		});	
	}

});

/* GET mentions */
router.get('/mentions', function(req, res, next) {
	res.render('mentions', { 
		title: 'Mentions légales - Smoky Truck',
		meta: 'Mentions légales du site Smoky Truck.' 
	});
});

module.exports = router;