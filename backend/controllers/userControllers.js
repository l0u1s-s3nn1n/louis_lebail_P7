const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const secretKey = process.env.TOKEN_KEY;



const getAllUsers = async (req, res) => {
  const users = await User.findAndCountAll();
  res.send({
    context: users.rows,
    total: users.count
  });
};
 
const getUser = async (req, res) => {
  const id = req.params.id;
  await User.findOne({ where: { id: id } }).then((item) => {
    if (item != null) {
      res.send(item);
    } else {
      res.sendStatus(404);
    }
  });
};
 
const saveUser = async (req, res) => {
  const hashedpassword = bcrypt.hashSync(req.body.password, 10)
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword
  };
  await User.create(user).then(() => {
    res.sendStatus(201);
  });
};
 
const updateUser = async (req, res) => {
  const id = req.params.id;
  await User.findByPk(id).then((item) => {
    if (item != null) {
      item
        .update({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
        .then(() => {
         return res.json({ mess: "utilisateur modifié!" });
        });
    } else {
      return res.status(404).send( {mess: "utilisateur non trouvé"} );;
    }
  });
};
 
const deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.findByPk(id).then((item) => {
    if (item != null) {
      item.destroy();
      return res.json({ mess: "utilisateur supprimé!" });
    } else {
      return res.status(404).send( {mess: "utilisateur non trouvé"} );;
    }
  });
};

const login = async (req, res, next) => {
  //on récupère le compte dans la DB avec l'email fournit
  User.findAll({ where : { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvée !" });
      }
      //Si on trouve un "user" alors on compare le mot de passe du front au back (tokens)
      console.log(user)
      bcrypt
        .compare(req.body.password, user[0].dataValues.password)
        .then((valid) => {
          //Si mauvais mot de passe
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //Si mot de passe : ok
          res.status(200).json({
            //token pour le "user"
            userId: user[0].dataValues.id,
            token: jwt.sign({ userId: user[0].dataValues.id }, `${secretKey}`, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(400).json({ mess : "erreur de décryptage" }));
    })
    .catch((error) => res.status(400).json({ mess : "erreur recherche user" }));
};


module.exports = {
  getAllUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  login
};

