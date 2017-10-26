var express = require('express');
var router = express.Router();
//const mysql = require('mysql');

/* 

--->GET ADMIN<----

const connection = mysql.createConnection({
 	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'groupe1'

});

*/


/* GET ADMIN */

router.get('/', function(req, res, next) {
	// Page de connexion
  res.render('login');
});

/*


router.post('/', function(req, res, next) {
	// Ici on gère les informations de l'utilisateur
	// tester si l'utilisateur existe en BDD 
	// Si l'utilisateur on ouvre sa session 

	console.log(req.body);
	let login = req.body.login ;
	let password= req.body.password;
	connection.query('SELECT * FROM users  WHERE name = "' + login + '" AND password = "' + password + '";', function (error, results, fields) {
	  if (error) throw error;

	  // console.log('The solution is: ', results[0].solution);

	  if (results.length === 0) {
	  	res.send("Cet utilisateur n'existe pas");
	  } else {
	  	req.session.connected = true;
	  	res.redirect('/admin/index');
	  }
	});
  	
});

router.get('/admin', function(req, res, next) {

	// Hello session !
	// Si pas connecté alors redirection

	if (req.session.connected){
		res.render('admin/index');
	} else {
		res.redirect('/');
	}
});
*/


router.get('/index', function(req, res, next) {
  res.render('admin-index');
});

router.get('/editor', function(req, res, next) {
  res.render('editor');
});


router.get('/menu', function(req, res, next) {
  res.render('admin-menu');
});

router.get('/lieu-hor', function(req, res, next) {
  res.render('admin-lieu-hor');
});



module.exports = router;
