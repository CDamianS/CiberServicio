const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

connection.connect(
  (err)=>{
    if(!err){console.log("Conexión establecida");}
    else {console.log("Conexión fallida" + err);}
  }
);

module.exports = connection;
