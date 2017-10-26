var express = require('express');
var router = express.Router();
//const mysql = require('mysql');
//const multer  = require('multer');
//const fs = require('fs');
//const upload = multer({ dest: 'tmp/' })

/* Database connexion */
/* const connection = mysql.createConnection({
 	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'groupe1'
}); */

//connection.connect(); // Camille: Je pense qu'on a oublié ça ?


/* GET admin page login */
router.get('/', function(req, res, next) {
res.render('admin_login');
});

/* Users verification */ // On vérifie si l'utilisateur existe dans la BDD.
/* router.post('/', function(req, res, next) {
	let login = req.body.login;
	let password = req.body.password;
	connection.query(`select * from users where username="${login}" and password="${password}"`, function (error, results, fields) {
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
	connection.query('SELECT * FROM news', function (error, results, fields) {
	  	if (error) throw error;
		res.render('admin_index', { 
			title: '*ADMIN* (accueil)',	
			results: results
		});
	});
});

router.get('/menu', function(req, res, next) {
	connection.query('SELECT * FROM menu', function (error, results, fields) {
	  	if (error) throw error;
		res.render('admin_menu', { 
			title: '*ADMIN* (menu)',
			results: results
		});
	});
});

router.get('/lieux-hor', function(req, res, next) {
	connection.query('SELECT * FROM places', function (error, results, fields) {
//Il faudrait aussi selectioner dans lieux-hor le tableau events??
	  	if (error) throw error;
		res.render('admin_lieu-hor', { 
			title: '*ADMIN* (lieux-horaires)',
			results: results
		});
	});
});


/* Admin editors (SI on crée 3 pages editor, mettre les bons nom des liens/fichiers ci-dessous...)*/
router.get('/editor', function(req, res, next) {
	res.render('admin_editor', { 
		title: '*ADMIN* (editeur accueil)'
	});
});

router.get('/editor', function(req, res, next) {
	res.render('admin_editor', { 
		title: '*ADMIN* (editeur menu)'
	});
});

router.get('/editor', function(req, res, next) {
	res.render('admin_editor', { 
		title: '*ADMIN* (editeur lieux-horaires)'
	});
});










/* MODEL DOJO: EDITEUR SITE (GET/POST) 
--> Il faudra peut-être intégrer ça dans chaque route.get des editors.


// GET /admin/create-product 
router.get('/create-product', function(req, res, next) {
	connection.query('SELECT * FROM products', function (error, results, fields) {
		res.render('admin-create', {categories: results});
	});
});

// POST /admin/create-product 
router.post('/create-product', upload.single('product_picture'), function(req, res, next) {
	// Ajouter un produit dans la table 'products'
	
	if(req.file){} // si req.file existe

	if (req.file.size < (3*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpg') ) {
		fs.rename(req.file.path,'public/images/'+req.body.product_namereq.file.originalname);
	} else {
		res.send('Vous avez fait une erreur dans le téléchargement')
	}
	connection.query('INSERT INTO products VALUES (null, ?, ?, ?, ?)',[req.body.product_name,req.body.product_description,  req.file.originalname,req.body.product_price] ,function (error, results, fields) {
	  	if (error) throw error;
	  	console.log(req.body.product_name);
	  	// connected!
	  	//res.render('admin-index', results);
	  	res.redirect('/admin');
		console.log(results);
	});
});

// GET /admin/delete-product 
router.get('/delete-product', function(req, res, next) {
	// Supprimer le produit en recupérant l'id dans la query 

	connection.query('delete from products where id = ?',[req.query.id] ,function (error, results, fields) {
		res.redirect('/admin');
	});
}); */


module.exports = router;