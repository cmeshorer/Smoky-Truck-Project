/* Appels des modules */
var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'tmp/' })
const config = require('../config.js');


/* -----------Connexion BDD */
const connection = mysql.createConnection(config);

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId); // Vérification de la connexion en console
});


/*------------- GET page administrateur */
router.get('/actus', function(req, res, next) {  
  connection.query('SELECT * FROM actus ORDER BY id desc', function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    // Pour récupérer les visites côté client
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }
    res.render('admin-actus', {
      title: 'Smoky Admin (actus)',
      actus : results,
      views_index: localStorage.getItem('visites_index')
    });
  });
});

/*-------------- Création d'une actu */
router.get('/create-actu', function(req, res, next) {
    res.render('admin-create-actu', {
      title : 'Création d\'une actualité'
    });
});

router.post('/create-actu', upload.single('image'), function(req, res, next) {
  // Gestion des images
  if ((req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg') && (req.file.size < 3145728)){
    fs.rename('tmp/' + req.file.filename, 'public/images/' + req.file.originalname, function(){
     });
   } else {
     fs.unlink(req.file.path, function(){
       res.send('Format jpg ou png, 3mo max'); 
       res.redirect('/admin/actus');
     });  
   }
  // Ajout d'une actualité
    connection.query('INSERT INTO actus VALUES (null, ?, ?, ?, ?)',[req.file.originalname, req.body.title, req.body.sous_titre, req.body.texte] ,function (error, results, fields) {
      console.log(results);
      console.log(req.body);
      if (error) {
        console.log(error);
      }
      res.redirect('/admin/actus');
    });
  });

/* Supprimer une actu */
router.get('/delete-actu/:id(\\d+)', function(req, res, next) {
  connection.query('DELETE FROM actus where id = ?',[req.params.id] ,function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    res.redirect('/admin/actus');
  });
});

/* Modifier une actu */
router.get('/modify-actu/:id(\\d+)',function(req, res){
  connection.query('SELECT * FROM actus WHERE id = ?', [req.params.id], function(error, results){
    if (error) {
      console.log(error);
    }
    res.render('admin-update-actu', {
      title : 'Modification d\'une actualité',
      actus: results[0]
    });
  });
});

router.post('/modify-actu/:id(\\d+)', upload.single('image'), function(req, res, next) {
  if(req.file) { // S'il y'a une nouvelle image, requête SQL avec la modification du nom de l'image
    if ((req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg') && (req.file.size < 3145728)){
      fs.rename('tmp/' + req.file.filename, 'public/images/' + req.file.originalname, function(){
      });
    } else {
      fs.unlink(req.file.path, function(){
      res.send('Format jpg ou png, 3mo max'); 
      });
    }

    connection.query('UPDATE actus SET titre = ?, sous_titre = ?, texte = ?, image = ? WHERE id = ?', [req.body.title, req.body.sous_titre, req.body.texte, req.file.originalname, req.params.id], function(error){
      if (error) {
      console.log(error);
      }
    })
  } else { // S'il n'y a pas de nouvelle image requête SQL sans le nom de l'image
    connection.query('UPDATE actus SET titre = ?, sous_titre = ?, texte = ? WHERE id = ?', [req.body.title, req.body.sous_titre, req.body.texte, req.params.id], function(error){
      if (error) {
      console.log(error);
      }
    })  
  }
  res.redirect('/admin/actus'); // Dans tous les cas redirection vers l'admin.
});

/* Adresses */
router.get('/horaires', function(req, res, next) {  
  connection.query('SELECT * FROM places ORDER BY idplaces asc', function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    res.render('admin-adresse', {
      title: 'Smoky Admin (horaires)',
      adresse : results
    });
  }); 
});

/* Modifier adresses */
router.get('/modify-adresse/:id(\\d+)',function(req, res){
  connection.query('SELECT * FROM places WHERE idmenu = ?', [req.params.id], function(error, results){
    if (error) {
      console.log(error);
    }
    res.render('admin-update-adresse', {
      title : 'Modification d\'une adresse',
      adresse: results
    });
  });
});

/*router.post('/modify-adresse/:id(\\d+)',function(req, res){
  connection.query('UPDATE places SET adresse = ? WHERE idplaces = ?', [req.body., req.params.id], function(error){
    if (error) {
      console.log(error);
    }
  });
  res.redirect('/admin/horaires');
});*/


module.exports = router;