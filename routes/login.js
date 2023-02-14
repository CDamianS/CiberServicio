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
  
/* POST page (login.ejs). */
router.post('/', function(req, res){

  /* Query */
  let query = `INSERT INTO users(name, role) VALUES ('${req.body.newUserName}','${req.body.newUserRole}')`;
  /* Sending data to DB */
  let queryExc = connection.query(query, function(err, rows, fields){
    if(!err)
    {
      /* Use full path from root folder */
      res.redirect('/login')
    }
    else
    console.log(err)
  });
});

module.exports = router;