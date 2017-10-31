/* Appels des modules */
var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'tmp/' })

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
router.get('/', function(req, res, next) {
  res.render('admin_login', {
    title: 'Login administrateur'
  });
});

/* POST login admin */
router.post('/', function(req, res, next) {
	let login= req.body.login;
	let password = req.body.password;
	connection.query(`select * from user where username="${login}" and password="${password}"`, function (error, results, fields) {
	 	if (results.length==0) {
	 	 	res.redirect('/admin');
	 	} else {
	 	 	req.connect=true;
	 	 	res.redirect('/admin/index');
	 	}
	});
});


/* GET page administrateur */
router.get('/index', function(req, res, next) {  
  connection.query('SELECT * FROM actus ORDER BY id desc', function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    res.render('admin-index', {
      title: 'Espace administrateur',
      actus : results
    });
  });
});

/* Création d'une actu */
router.get('/create', function(req, res, next) {
    res.render('admin-create', {
      title : 'Création d\'une actualité'
    });
});

router.post('/create', upload.single('image'), function(req, res, next) {
  // Gestion des images
  if ((req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg') && (req.file.size < 3145728)){
    fs.rename('tmp/' + req.file.filename, 'public/images/' + req.file.originalname, function(){
    });
  } else {
    fs.unlink(req.file.path, function(){
      res.send('Format jpg ou png, 3mo max'); 
      res.redirect('/admin/index');
    });  
  }
  // Ajout d'une actualité
    connection.query('INSERT INTO actus VALUES (null, ?, ?, ?, ?)',[req.file.originalname, req.body.title, req.body.sous_titre, req.body.text] ,function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      res.redirect('/admin/index');
    });
  });

/* Supprimer une actu */
router.get('/supprimer/:id(\\d+)', function(req, res, next) {
  connection.query('DELETE FROM actus where id = ?',[req.params.id] ,function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    res.redirect('/admin/index');
  });
});

/* Modifier une actu */
router.get('/modifier/:id(\\d+)',function(req, res){
  connection.query('SELECT * FROM actus WHERE id = ?', [req.params.id], function(error, results){
    if (error) {
      console.log(error);
    }
    res.render('admin-update', {
      title : 'Modification d\'une actualité',
      actus: results[0]
    });
  });
});

router.post('/modifier/:id(\\d+)', upload.single('image') ,function(req, res, next) {
  
  if(req.file) { // S'il y'a une nouvelle image, requête SQL avec la modification du nom de l'image
    if ((req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg') && (req.file.size < 3145728)){
      fs.rename('tmp/' + req.file.filename, 'public/images/' + req.file.originalname, function(){
      });
    } else {
      fs.unlink(req.file.path, function(){
      res.send('Format jpg ou png, 3mo max'); 
      });
    }

    connection.query('UPDATE actus SET titre = ?, sous_titre = ?, texte = ?, image = ? WHERE id = ?', [req.body.title, req.body.sous_titre, req.body.text, req.file.originalname, req.params.id], function(error){
      if (error) {
      console.log(error);
      }
    })


  } else { // S'il n'y a pas de nouvelle image requête SQL sans le nom de l'image
    connection.query('UPDATE actus SET titre = ?, sous_titre = ?, text = ? WHERE id = ?', [req.body.title, req.body.sous_titre, req.body.text, req.params.id], function(error){
      if (error) {
      console.log(error);
      }
    })  
  }

  res.redirect('/admin/index'); // Dans tous les cas redirection vers l'admin.

});

module.exports = router;