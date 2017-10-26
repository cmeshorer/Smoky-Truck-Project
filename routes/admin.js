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
res.render('admin_login');
});

/* Users verification */ // On vérifie si l'utilisateur existe dans la BDD.
/* router.post('/', function(req, res, next) {
	let login = req.body.login;
	let password = req.body.password;
	connection.query(`select * from users where login="${login}" and password="${password}"`, function (error, results, fields) {
	  if (error) throw error; 
	  if (results.length === 0) {
	  	res.send("Cet utilisateur n'existe pas"); // Si la requête SQL ne renvoit pas de résultat l'utilisateur n'existe pas. On lui envoie un message pour l'informer.
	  } else {
	  	req.session.connect = true;
	  	res.redirect('/admin/index'); // Si l'utilisateur existe on ouvre la session et on le redirige sur l'espace admin.
	  }
	});	
}); */

/* User redirection */ // On redirige l'utilisateur connecté sur l'espace admin.
/*router.get('/admin/index', function(req, res, next) {
	if (req.session.connect){
		res.render('admin/index'); // Si l'utilisateur est connecté il accède à l'espace d'administration sur l'index.
	} else {
		res.redirect('/'); // Sinon il retourne au login
	}
}); */

/* Admin routes */
router.get('/index', function(req, res, next) {
  res.render('admin_index');
});

router.get('/menu', function(req, res, next) {
  res.render('admin_menu');
});

router.get('/lieu-hor', function(req, res, next) {
  res.render('admin_lieu-hor');
});

router.get('/editor', function(req, res, next) {
  res.render('admin_editor');
});

module.exports = router;