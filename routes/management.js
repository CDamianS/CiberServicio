var express = require('express');
var router = express.Router();
var connection = require("../database/connection");

/* GET page (login.ejs). */
router.get('/', function(req, res, next) {

  /* Retrieve of DB data */
  connection.query("SELECT * FROM users", function(errDB, data){

      /* Show data in console */
      //console.log(data);

      /* Rendered page with queried data*/
      res.render('management', { title: 'Management', usersDB: data });
        
    });
  });
  
router.post('/addUser', function(req, res){

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

router.post('/modifyUser', function(req, res){

  let idToModf = req.body['doModf'];
  let matr = req.body['modfMatr'];
  let name = req.body['modfName'];
  let role = req.body['modfRole'];
  let sql = `UPDATE users SET matricula='${matr}', name='${name}', role='${role}' WHERE id=${idToModf}`;
  connection.query(sql, err=>{
    if(!err){
      console.log('Successfully added user')
      res.redirect('/management')
    }
    else
    console.log(err);
  });
});

router.post('/deleteUser', function(req, res){

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