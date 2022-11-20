var express = require('express');
var router = express.Router();

/* GET home page (index.ejs). */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page (reglamento.ejs). */
router.get('/reglamento', function(req, res, next) {
  res.render('reglamento', { title: 'Reglamento' });
});

module.exports = router;
