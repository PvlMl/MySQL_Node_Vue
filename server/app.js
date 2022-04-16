const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();
const busboy = require("busboy"); 

app.use(cors());

// CREATE DATABASE [IF NOT EXISTS] postsdb;

// CREATE TABLE posts
// (
//   id MEDIUMINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
//   title VARCHAR(30) NOT NULL,
//   postBody TEXT NOT NULL,
//   postDate Date NOT NULL,  
//   imageLink VARCHAR(255)
// );

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "postsdb",
  password: ""
});
 
app.get("/", function(req, res){
  pool.query("SELECT * FROM posts", function(err, data) {
    if(err) return console.log(err);
    res.send(data);
  });
});

app.get("/post/:id", function(req, res){
  const id = req.params.id;
  pool.query("SELECT * FROM posts WHERE id=?",id ,function(err, data) {
    if(err) return console.log(err);
    res.send(data);
  });
});

app.post("/add", function (req, res) {
  const itemData = {}
  const bb = busboy({ headers: req.headers });
            bb.on('field', (name, val) => {
              itemData[name] = val;
            });
            bb.on('close', () => {
              pool.query("INSERT INTO posts(title, postBody, imageLink, postDate) VALUES (?,?,?,CURDATE())", 
              [itemData.title, itemData.text, itemData.image],
               function(err) {
                if(err) return console.log(err);
              });
              res.send();
           });
  req.pipe(bb);
});

app.delete("/delete/:id", function(req, res){
  const id = req.params.id;
  pool.query("DELETE FROM posts WHERE id=?", [id], function(err, data) {
    if(err) return console.log(err);
    res.send(data);
  });
});
app.put("/edit/:id", function(req, res){
  const itemData = {}
  const bb = busboy({ headers: req.headers });
            bb.on('field', (name, val) => {
              itemData[name] = val;
            });
            bb.on('close', () => {
              pool.query("UPDATE posts SET title=?, postBody=?, imageLink=? WHERE id=?", 
              [itemData.title, itemData.text, itemData.image, req.params.id],
               function(err) {
                if(err) return console.log(err);
              });
              res.send();
           });
  req.pipe(bb);
});
 
app.listen(3000, function(){
  console.log("waiting for a connection...");
});