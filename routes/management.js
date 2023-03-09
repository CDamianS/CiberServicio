var express = require('express');
var router = express.Router();
var connection = require("../database/connection");
var session = require('express-session');
var passport = require('passport');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();
var bcrypt = require('bcrypt');

/* GET page (management.ejs). */
router.get('/', ensureLoggedIn, function(req, res, next) {

  /* Retrieve of DB data */
  connection.query("SELECT * FROM users", function(err, data){
    if (!err) {
      /* Rendered page with queried data*/
      res.render('management', { title: 'Management', usersDB: data });
    }
    else
    console.log(err);
  });
});

/* POST page (management.ejs management/addUser). */
router.post('/addUser', ensureLoggedIn, async function(req, res){

  let matr = req.body.newUserMatr;
  let name = req.body.newUserName;
  let role = req.body.newUserRole;
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = await bcrypt.hashSync(req.body.newUserPass, salt);

  let sql = 'INSERT INTO users (matricula, name, password, hash, role) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [matr, name, hashedPassword, hash, role], err=>{
    if(!err){
    console.log('Successfully added user')
    res.redirect('/management')
    }
    else
    console.log(err);
  });
});

/* POST page (management.ejs management/modifyUser). */
router.post('/modifyUser', ensureLoggedIn,function(req, res){

  let idToModf = req.body['modfId'];
  let matr = req.body['modfMatr'];
  let name = req.body['modfName'];
  let role = req.body['modfRole'];
  let pass = req.body['modfPass'];

  let sql = 'SELECT hash FROM users WHERE id = ?';
  connection.query(sql, [idToModf],async function(err, data){
    if(!err){

      let hashedPassword = await bcrypt.hashSync(pass, data[0].hash);
      sql =' UPDATE users SET matricula=?, name=?, password=?, role=? WHERE id=?';

      connection.query(sql, [matr, name, hashedPassword, role, idToModf], err=>{
        if(!err){
          console.log('Successfully modified user')
          res.redirect('/management')
        }
        else
        console.log(err);
      });

    }
    else
    console.log(err);
  });
});

/* POST page (management.ejs management/deleteUser). */
router.post('/deleteUser', ensureLoggedIn, function(req, res){

  let idToDelete = req.body['deleteUserButton'];
  let sql = 'DELETE FROM users WHERE id = ?';

  connection.query(sql, idToDelete, err=>{
    if(!err){
      console.log('Successfully deleted user')
      res.redirect('/management')
    }
    else
    console.log(err);
  });
});

module.exports = router;