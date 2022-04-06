const sequelize = require("./database/database");
const User = require("./models/userModels");
 
const express = require('express');

const app = express();
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require('path');
const auth = require("./middlewares/authMiddlewares");

dotenv.config();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));


const userRoutes = require("./routes/userRoutes");

//app.use("/api/auth", userRoutes);










dotenv.config();





app.use(cors());

app.use(bodyParser.json());

app.use(
  helmet({
    crossOriginResourcePolicy: false,//corrige erreur console
    // ...
  })
);

app.get("/", (req, resp) => resp.send("application is up and running"));
 
app.use("/api", userRoutes.routes);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});



//app.use("/api/user", userRoutes);
//app.use("/api/post", postRoutes);
//app.use("/api/comment", commentRoutes);
//app.use("/images", express.static(path.join(__dirname, "images")));


module.exports = app;

