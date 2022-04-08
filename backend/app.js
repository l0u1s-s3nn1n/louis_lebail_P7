//Imports
const express = require('express');
const path = require('path');
const sequelize = require("./config/database");

//Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

sequelize.sync({ force: false }).then(() => console.log("Base de données connectée"));

//Création de l'app express
const app = express();

//CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Parsing des requêtes en JSON
app.use(express.json());

//Gestion des fichiers avec le multer
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes de l'API
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;