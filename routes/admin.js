var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'tmp/' })

/* Connexion BDD */
var connection = mysql.createConnection({
    host     : 'localhost',
  user     : 'root',
  password : 'alroot',
  database : 'smoky_truck'
});

connection.connect(function(err) {
  console.log('connected as id ' + connection.threadId); // Vérification de la connexion
});

/* GET page login admin */
router.get('/', function(req, res, next) {
  res.render('admin_login', {
    title: 'Login administrateur'
  });
});

/* GET page administrateur */
router.get('/index', function(req, res, next) {  
  connection.query('SELECT * FROM actus', function (error, results, fields) {
    res.render('admin-index', {
      title: 'Espace administration',
      actus : results
    });
  });
});

/* GET création d'une actu */
router.get('/create', function(req, res, next) {
    res.render('admin-create-actu', {title : 'Création d\'une actualité'});
});

/* POST création d'une actu */
router.post('/create', upload.single('image'), function(req, res, next) {
  // Gestion des images
  if(req.file){}
  if ((req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg') && (req.file.size < 3145728)){
    fs.rename('tmp/' + req.file.filename, 'public/images/' + req.file.originalname, function(){
    });
  } else {
    fs.unlink(req.file.path, function(){
      res.send('Format jpg ou png, 3mo max'); 
    });  
  }
  // Ajout d'une actualité
    connection.query('INSERT INTO actus VALUES (null, ?, ?, ?, ?)',[req.file.originalname, req.body.title, req.body.sous_titre, req.body.text] ,function (error, results, fields) {
      res.redirect('/admin/index');
    });
  });

/* DELETE Supprimer une actualité */
router.get('/supprimer/:id', function(req, res, next) {
  connection.query('DELETE FROM actus where id = ?',[req.params.id] ,function (error, results, fields) {
    res.redirect('/admin/index');
  });
});

module.exports = router;