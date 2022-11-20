const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'productos'
});

connection.connect( 
    (err)=>{
        if(!err){ console.log("Conexion establecida");}
        else{ console.log("Conexion fallida");}
    }

);

connection.query("SELECT * FROM tblproductos",function(err,resultados){
    
    console.log(resultados);
    
});

connection.end();