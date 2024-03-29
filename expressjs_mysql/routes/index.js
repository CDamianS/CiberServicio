var express = require('express');
var router = express.Router();

/* GET home page (index.ejs). */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cyber Homepage' });
});

/* GET page (reglamento.ejs). */
router.get('/reglamento', function(req, res, next) {
  res.render('reglamento', { title: 'Reglamento' });
});

/* GET page (reglamento.ejs). */
router.get('/rentar', function(req, res, next) {
  res.render('rentar', { title: 'Rentar' });
});

/* GET page (login.ejs). */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;