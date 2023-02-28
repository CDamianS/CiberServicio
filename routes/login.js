const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');

/* GET page (management.ejs). */
router.get('/', function(req, res, next) {
    /* Render login.ejs */
    res.render('login', { title: 'Login'});
});
  
/* POST page (management.ejs management/addUser). */
router.post('/', passport.authenticate('local', {
    successRedirect: '/management',
    failureRedirect: '/login'
}));

module.exports = router;