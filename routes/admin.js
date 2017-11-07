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
    // Pour récupérer les visites côté client
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }
    res.render('admin-adresse', {
      title: 'Smoky Admin (horaires)',
      adresse : results,
      views_index: localStorage.getItem('visites_index')
    });
  });
});

/* Modifier adresses */
router.get('/modify-adresse/:id(\\d+)',function(req, res){
    res.render('admin-update-adresse', {
      title : 'Modification d\'une adresse',
    });
});

router.post('/modify-adresse/:id(\\d+)',function(req, res){
  connection.query('UPDATE places SET adresse = ? WHERE idplaces = ?', [req.body.button, req.params.id], function(error){
    if (error) {
      console.log(error);
    }
  });
  res.redirect('/admin/horaires');
});


/*------------- GET page administrateur menu */
router.get('/menu', function(req, res, next) { 
  connection.query('SELECT * FROM menu ORDER BY category, idmenu desc', function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    // Pour récupérer les visites côté client
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    res.render('admin-menu', {
      title: 'Smoky Admin (menu)',
      menu : results,
      views_index: localStorage.getItem('visites_index'),

    });
  });
});

/*------------- Créer un nouvel élément dans le menu */

router.get('/creationmenu', function (req, res){
  res.render('admin-createmenu');
});

var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]);

router.post('/creationmenu', cpUpload, function(req, res, next) {
  //-----------------Gestion des images
  if ( (req.files['image'][0].mimetype == 'image/png' || req.files['image'][0].mimetype == 'image/jpeg' || req.files['image'][0].mimetype == 'image/gif') && (req.files['image'][0].size < 3145728) ) {
    fs.rename('tmp/' + req.files['image'][0].filename, 'public/images/' + req.files['image'][0].originalname, function(){
    });
    console.log (req.files['image']);
  } else if ( (req.files['icon'][0].mimetype == 'image/png' || req.files['icon'][0].mimetype == 'image/jpeg' || req.files['icon'][0].mimetype == 'image/gif') && (req.files['icon'][0].size < 3145728)){
    fs.rename( 'tmp/' + req.files['icon'][0].filename, 'public/images/' + req.files['icon'][0].originalname, function(){
    });
    console.log (req.files['icon']);
  } else {
    console.log('Fail')
    fs.unlink(req.files['image'][0].path, function(){
      res.send('<p>Format image jpg ou png, 3mo max<p>'); 
      res.redirect('/admin/menu');
    }); 
    fs.unlink(req.files['icon'][0].path, function(){
      res.send('<p>Format icon jpg ou png, 3mo max<p>'); 
      res.redirect('/admin/menu');
    }); 
  }
  //------------------ Ajout d'une nouvelle card MENU
  connection.query('INSERT INTO menu VALUES (null, ?, ?, ?, ?, ?, ?, ?)', [req.body.name, req.body.description, req.body.price, req.body.pieces, req.files['image'][0].originalname, req.files['icon'][0].originalname, req.body.button] ,function (error, results, fields) {
    console.log(results);
    if (error) {
      console.log(error);
    }
    res.redirect('/admin/menu');
  });
});

/*------------- Modifier un élément du menu */
router.get('/modifiermenu/:id(\\d+)',function(req, res){
    connection.query('SELECT * FROM menu WHERE idmenu = ?', [req.params.id], function(error, results){
        if (error) {
        console.log(error);
        }
    res.render('admin-update-menu', {
      title : 'Modification d\'un produit',
      menu: results[0]
    });
});
});

var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]);

router.post('/modifiermenu/:id(\\d+)', cpUpload, function(req, res, next) {
    //-----------------Gestion des images
    if(req.files['image'] || req.files['icon'] ) {
    if ( (req.files['image'][0].mimetype == 'image/gif' || req.files['image'][0].mimetype == 'image/png' || req.files['image'][0].mimetype == 'image/jpeg' || req.files['image'][0].mimetype == 'image/gif') && (req.files['image'][0].size < 3145728)){
        fs.rename('tmp/' + req.files['image'][0].filename, 'public/images/' + req.files['image'][0].originalname, function(){
    });
    } else if ( (req.files['icon'][0].mimetype == 'image/gif' || req.files['icon'][0].mimetype == 'image/png' || req.files['icon'][0].mimetype == 'image/jpeg' || req.files['icon'][0].mimetype == 'image/gif') && (req.files['icon'][0].size < 3145728)){
        fs.rename( 'tmp/' + req.files['icon'][0].filename, 'public/images/' + req.files['icon'][0].originalname, function(){
    });
    } else {
        fs.unlink(req.files['image'][0].path, function(){
        res.send('Format jpg ou png, 3mo max'); 
        res.redirect('/admin/menu');
    }); 
    fs.unlink(req.files['icon'][0].path, function(){
      res.send('Format jpg ou png, 3mo max');
      res.redirect('/admin/menu');
    });
  }
  console.log (req.body)
  connection.query('UPDATE menu SET category = ?, name = ?, description = ?, price = ?, pieces= ?, icon = ?, image = ? WHERE idmenu = ?', [req.body.button, req.body.name, req.body.description, req.body.price, req.body.pieces, req.files['icon'][0].originalname, req.files['image'][0].originalname, req.params.id], function(error){
    if (error) {
      console.log(error);
    }
  })

} else {
console.log(req.body) // S'il n'y a pas de nouvelle image requête SQL sans le nom de l'image
    connection.query('UPDATE menu SET category = ?, name = ?, description = ? price = ?, pieces= ?,  WHERE idmenu = ?', [req.body.button, req.body.name, req.body.description, req.body.price, req.body.pieces, req.params.id], function(error){
      if (error) {
      console.log(error);
      }
    })  
  }
  res.redirect('/admin/menu'); // Dans tous les cas redirection vers l'admin.
});

 /*------------------ Supprimer une CARD MENU */
router.get('/supprimermenu/:id(\\d+)', function(req, res, next) {
  connection.query('DELETE FROM menu where idmenu = ?',[req.params.id] ,function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    res.redirect('/admin/menu');
  });
});

module.exports = router;