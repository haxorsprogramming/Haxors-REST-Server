const path = require('path');
const express = require('express');
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbs_haxors'
});

conn.connect((err) =>{
  if(err) throw err;
  console.log('Koneksi berhasil...');
});
//endpoint home
app.get('/', function(req, res){
  res.send("RESTFull Server Haxors programming club. Develop in Node JS");
});
//endpoint => mahasiswa (get)
app.get('/mahasiswa/all', function(req, res){
    let nama = req.params.nama;
    let sql = "SELECT * FROM tbl_profile;";
    conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
//endpoint mahasiswa detail 
app.post('/mahasiswa/profil', function(req, res){
  let username = req.body.username;
  let sql = "SELECT * FROM tbl_profile WHERE username='"+username+"' LIMIT 0, 1";
  conn.query(sql, function(err, result, fields){
    res.json(result);
  });
});
//endpoint => mahasiswa (post)
app.post('/mahasiswa',function(req, res){
  let nama = req.body.nama;
  var data = {
    'nama' : nama
  }
  res.json(data);
});
//endpoint tambah mahasiswa
app.post('/mahasiswa/tambah',function(req, res){
  let email = req.body.email;
  let query = "INSERT INTO tbl_sent_email VALUES(null, '"+email+"','terkirim');";
  conn.query(query, function (err, result) {
    if (err) throw err;
    res.send('Username ' + email + ' berhasil ditambahkan ...');
  });
});

//jalankan server
app.listen(3561, () => {
  console.log('Server sedang berjalan ... ');
});
