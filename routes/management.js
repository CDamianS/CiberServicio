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
    if(!err)
    {
    console.log('Successfully added user')
    res.redirect('/management')
    
    }
    else
    console.log(err);
  });
});

module.exports = router;