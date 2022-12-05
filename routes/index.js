var express = require('express');
var router = express.Router();

/* GET home page (index.ejs). */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cyber' });
});

/* GET home page (reglamento.ejs). */
router.get('/reglamento', function(req, res, next) {
  res.render('reglamento', { title: 'Reglamento' });
});

/* GET home page (reglamento.ejs). */
router.get('/rentar', function(req, res, next) {
  res.render('rentar', { title: 'Rentar' });
});


module.exports = router;
