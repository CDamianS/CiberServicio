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
      res.render('login', { title: 'Login', usersDB: data });
        
    });
  });
  
module.exports = router;