var express = require('express');
var router = express.Router();
var connection = require("../database/connection");
var session = require('express-session');
var passport = require('passport');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();
var bcrypt = require('bcrypt');
var crypto = require('crypto');
const Excel = require('exceljs');
// Dotenv vars for soft encryption
var algorithm = process.env.ALGORITHM_CRYPTO_IFWIMA; 
var initVectorString = process.env.CRYPTO_IV_DKIBES; // You can store this into a env file
var SecurityKeyString = process.env.NAMES_KEY_HJGLIP; // You can store this into a env file
var initVector = Buffer.from(initVectorString, "hex");  
var Securitykey = Buffer.from(SecurityKeyString, "hex");
// Delete on deployment | Required only during development
require('dotenv').config()

/* Soft encryption for names */
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(text, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(text, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
}

/* GET page (management.ejs). */
router.get('/', ensureLoggedIn, function(req, res, next) {

  /* Retrieve of DB data */
  connection.query('SELECT id, matricula, name, role FROM users', function(err, data){
    if (!err) {
      /* Decrypt the names */
      for (var i = 0; i < data.length; i++){
        data[i].name = decrypt(data[i].name, process.env.NAMES_KEY_HJGLIP)
      }
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
  let cipherName = encrypt(name);
  let role = req.body.newUserRole;
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = await bcrypt.hashSync(req.body.newUserPass, salt);

  let sql = 'INSERT INTO users (matricula, name, password, role) VALUES (?, ?, ?, ?)';
  connection.query(sql, [matr, cipherName, hashedPassword, role], err=>{
    if(!err){
    console.log('Successfully added user')
    res.redirect('/management')
    }
    else
    console.log(err);
  });
});

/* POST page (management.ejs management/modifyUser). */
router.post('/modifyUser', ensureLoggedIn, async function (req, res) {

  let idToModf = req.body['modfId'];
  let matr = req.body['modfMatr'];
  let name = req.body['modfName'];
  let cipherName = encrypt(name);
  let role = req.body['modfRole'];
  let pass = req.body['modfPass'];
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = await bcrypt.hashSync(pass, salt);

  sql = ' UPDATE users SET matricula=?, name=?, password=?, role=? WHERE id=?';

  connection.query(sql, [matr, cipherName, hashedPassword, role, idToModf], err => {
    if (!err) {
      console.log('Successfully modified user')
      res.redirect('/management')
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

/* GET page (management.ejs management/downloadUsers). */
router.get('/downloadUsers', ensureLoggedIn, (req, res) => {
  // MySQL query to select table data
  const sql = 'SELECT id, matricula, name, role FROM users';
  
  connection.query(sql, (err, data) => {
    if (err) throw err;
    
    // Excel workbook and worksheet
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Users Data');
    
    // Add column headers to worksheet
    for (var i = 0; i < data.length; i++){
      data[i].name = decrypt(data[i].name, process.env.NAMES_KEY_HJGLIP)
    }
    const columns = Object.keys(data[0]);
    worksheet.addRow(columns);
    
    // Add data rows to worksheet
    data.forEach(row => {
      const values = [];
      columns.forEach(column => {
        values.push(row[column]);
      });
      worksheet.addRow(values);
    });
    
    // Set response headers for Excel file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=users_table_data.xlsx');
    
    // Write workbook to response
    workbook.xlsx.write(res)
      .then(() => {
        res.end();
      });
  });
});

/* GET page (management.ejs management/downloadClients). */
router.get('/downloadClients', ensureLoggedIn, (req, res) => {
  // MySQL query to select table data
  const sql = 'SELECT * FROM clients';
  
  connection.query(sql, (err, data) => {
    if (err) throw err;
    
    // Excel workbook and worksheet
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Logs Data');
    
    // Add column headers to worksheet
    const columns = Object.keys(data[0]);
    worksheet.addRow(columns);
    
    // Add data rows to worksheet
    data.forEach(row => {
      const values = [];
      columns.forEach(column => {
        values.push(row[column]);
      });
      worksheet.addRow(values);
    });
    
    // Set response headers for Excel file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=clients_table_data.xlsx');
    
    // Write workbook to response
    workbook.xlsx.write(res)
      .then(() => {
        res.end();
      });
  });
});

/* GET page (management.ejs management/downloadGames). */
router.get('/downloadGames', ensureLoggedIn, (req, res) => {
  // MySQL query to select table data
  const sql = 'SELECT * FROM games';
  
  connection.query(sql, (err, data) => {
    if (err) throw err;
    
    // Excel workbook and worksheet
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Logs Data');
    
    // Add column headers to worksheet
    const columns = Object.keys(data[0]);
    worksheet.addRow(columns);
    
    // Add data rows to worksheet
    data.forEach(row => {
      const values = [];
      columns.forEach(column => {
        values.push(row[column]);
      });
      worksheet.addRow(values);
    });
    
    // Set response headers for Excel file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=games_table_data.xlsx');
    
    // Write workbook to response
    workbook.xlsx.write(res)
      .then(() => {
        res.end();
      });
  });
});

/* GET page (management.ejs management/downloadSanctions). */
router.get('/downloadSanctions', ensureLoggedIn, (req, res) => {
  // MySQL query to select table data
  const sql = 'SELECT * FROM sanctions';
  
  connection.query(sql, (err, data) => {
    if (err) throw err;
    
    // Excel workbook and worksheet
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sanctions Data');
    
    // Add column headers to worksheet
    const columns = Object.keys(data[0]);
    worksheet.addRow(columns);
    
    // Add data rows to worksheet
    data.forEach(row => {
      const values = [];
      columns.forEach(column => {
        values.push(row[column]);
      });
      worksheet.addRow(values);
    });
    
    // Set response headers for Excel file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=sanctions_table_data.xlsx');
    
    // Write workbook to response
    workbook.xlsx.write(res)
      .then(() => {
        res.end();
      });
  });
});

/* GET page (management.ejs management/downloadLogs). */
router.get('/downloadLogs', ensureLoggedIn, (req, res) => {
  // MySQL query to select table data
  const sql = 'SELECT * FROM logs';
  
  connection.query(sql, (err, data) => {
    if (err) throw err;
    
    // Excel workbook and worksheet
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Logs Data');
    
    // Add column headers to worksheet
    const columns = Object.keys(data[0]);
    worksheet.addRow(columns);
    
    // Add data rows to worksheet
    data.forEach(row => {
      const values = [];
      columns.forEach(column => {
        values.push(row[column]);
      });
      worksheet.addRow(values);
    });
    
    // Set response headers for Excel file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=logs_table_data.xlsx');
    
    // Write workbook to response
    workbook.xlsx.write(res)
      .then(() => {
        res.end();
      });
  });
});

module.exports = router;