var express = require('express');
var router = express.Router();
var connection = require("../database/connection");
const session = require('express-session');
const passport = require('passport');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();

/* GET page (management.ejs). */
router.get('/', ensureLoggedIn, function(req, res, next) {

  /* Retrieve of DB data */
  connection.query("SELECT * FROM users", function(errDB, data){

    /* Rendered page with queried data*/
    res.render('management', { title: 'Management', usersDB: data });
        
  });
});

/* POST page (management.ejs management/addUser). */
router.post('/addUser', ensureLoggedIn, function(req, res){

  let sql = `INSERT INTO users (matricula, name, role) VALUES ('${req.body.newUserMatr}', '${req.body.newUserName}', '${req.body.newUserRole}')`;
  connection.query(sql, err=>{
    if(!err){
    console.log('Successfully added user')
    res.redirect('/management')
    }
    else
    console.log(err);
  });
});

/* POST page (management.ejs management/modifyUser). */
router.post('/modifyUser', ensureLoggedIn, function(req, res){

  let idToModf = req.body['modfId'];
  let matr = req.body['modfMatr'];
  let name = req.body['modfName'];
  let role = req.body['modfRole'];
  let sql = `UPDATE users SET matricula='${matr}', name='${name}', role='${role}' WHERE id=${idToModf}`;
  connection.query(sql, err=>{
    if(!err){
      console.log('Successfully modified user')
      res.redirect('/management')
    }
    else
    console.log(err);
  });
});

/* POST page (management.ejs management/deleteUser). */
router.post('/deleteUser', ensureLoggedIn, function(req, res){

  let idToDelete= req.body['deleteUserButton'];
  let sql = `DELETE FROM users WHERE id=${idToDelete}`;

  connection.query(sql, err=>{
    if(!err){
      console.log('Successfully deleted user')
      res.redirect('/management')
    }
    else
    console.log(err);
  });
});

module.exports = router;