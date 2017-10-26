var express = require('express');
var router = express.Router();
//const mysql = require('mysql');

/* Database connexion */
/* const connection = mysql.createConnection({
 	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'groupe1'
}); */

/* GET admin page login */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* Users verification */ // On vérifie si l'utilisateur existe en BDD.
/* router.post('/', function(req, res, next) {
	let login = req.body.login ;
	let password= req.body.password;
	connection.query(`select * from users where login= "${login}" and password="${password}"`, function (error, results, fields) {
	  if (error) throw error; 
	  if (results.length === 0) {
	  	res.send("Cet utilisateur n'existe pas"); // S'il pas résultat dans la BDD l'utilisateur n'existe pas et on lui envoie un message pour l'informer.
	  } else {
	  	req.session.connect = true;
	  	res.redirect('/admin/index'); // Si l'utilisateur existe on ouvre la session et on le redirige sur l'espace admin.
	  }
	});	
}); */

/* User rediraction */
/*router.get('/admin/index', function(req, res, next) {
	if (req.session.connected){
		res.render('admin/index'); // Si l'utilisateur est connecté il accède à l'espace d'administration sur l'index.
	} else {
		res.redirect('/'); // Sinon il retourne au login
	}
}); */

/* Admin routes */
router.get('/index', function(req, res, next) {
  res.render('index-admin');
});

router.get('/editor', function(req, res, next) {
  res.render('editor');
});


router.get('/menu', function(req, res, next) {
  res.render('menu-admin');
});

router.get('/lieu-hor', function(req, res, next) {
  res.render('lieu-hor-admin');
});

module.exports = router;