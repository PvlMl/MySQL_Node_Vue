const { Sequelize, DataTypes } = require('sequelize');
const express = require("express");
const cors = require("cors");
const busboy = require("busboy"); 

const app = express();
const urlencodedParser = express.urlencoded({extended: false});

app.use(cors());

const sequelize = new Sequelize("postsdb", "root", "123321", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: true
  }
});

const User = sequelize.define("2post", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postBody: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    imageLink: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: { 
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
     }
  });

  sequelize.sync().then(()=>{
    app.listen(3000, function(){
      console.log("Сервер ожидает подключения...");
    });
  }).catch(err=>console.log(err));

  app.get("/", function(req, res){
    User.findAll({raw: true }).then(data=>{
      res.send(data);
    }).catch(err=>console.log(err));
});

app.get("/post/:id", function(req, res){
    const id = req.params.id;
    User.findAll({where:{id}, raw: true }).then(data=>{
      res.send(data);
    }).catch(err=>console.log(err));
});

app.post("/add", urlencodedParser, function (req, res) {
         
    if(!req.body) return res.sendStatus(400);
         
    const itemData = {};

    const bb = busboy({ headers: req.headers });
            bb.on('field', (name, val) => {
              itemData[name] = val;
            });

            bb.on('close', () => {
                console.log(itemData)
                User.create({title: itemData.title, postBody: itemData.text, imageLink: itemData.image}).then(()=>{
                    res.send();
                  }).catch(err=>console.log(err));
             });
    req.pipe(bb);
});

app.delete("/delete/:id", function(req, res){
  const id = req.params.id;
  User.destroy({where: {id} }).then(() => {
    res.send("OK")
  }).catch(err=>console.log(err));
});

app.put("/edit/:id", urlencodedParser, function (req, res) {
         
  if(!req.body) return res.sendStatus(400);
       
  const itemData = {};

  const bb = busboy({ headers: req.headers });
          bb.on('field', (name, val) => {
            itemData[name] = val;
          });
          const id = req.params.id;
          bb.on('close', () => {
              console.log(itemData)
              User.update({title: itemData.title, postBody: itemData.text, imageLink: itemData.image},
                {where: {id} }).then(()=>{
                  res.send("OK");
                }).catch(err=>console.log(err));
           });
  req.pipe(bb);
});