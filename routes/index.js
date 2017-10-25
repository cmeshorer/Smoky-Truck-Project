var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/mentions', function(req, res, next) {
  res.render('mentions');
});

router.get('/error', function(req, res, next) {
  res.render('error');
});

module.exports = router;
