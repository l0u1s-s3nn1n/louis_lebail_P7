const sequelize = require("./database/database");
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const usersRoutes = require('./routes/userRoutes');
const postsRoutes = require('./routes/postRoutes');
const commentsRoutes = require('./routes/commentRoutes');

const path = require('path');

// dotenv
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
/*CROSS ORIGIN RESOURCE SHARING */
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization',
	); //on autorise certains headers
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	); // on autorise certaines méthod
	next();
});
app.get('/', (req, res) => {
	res.send(' Serveur connecté');
});
/* BODY PARSER */
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
/* HELMET */
app.use(helmet());
/*MULTER*/
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes
app.use('/api/users/', usersRoutes);
app.use('/api/posts/', postsRoutes);
app.use('/api/posts/', commentsRoutes);

module.exports = app;


/*const sequelize = require("./database/database");
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


module.exports = app;*/