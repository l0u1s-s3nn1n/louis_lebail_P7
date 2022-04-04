const jwt = require("jsonwebtoken");
const models = require("../models");

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, "SECRET_KEY");
		const user = await models.User.findOne({ where: { id: decodedToken.id } });
		if (!user) {
			throw new Error("invalid");
		}
		req.user = user;
		next();
	} catch (err) {
		res.status(401).json({ error: "Besoin d'un token" });
	}
};





/*//Protéger route post et messages et dans user : getall getone update delete
//non protégé conexion et ajout user.
//modérateur.

const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.TOKEN_KEY;

module.exports = (req, res, next) => {
  try {
    //récupération du token 
    const token = req.headers.authorization.split(" ")[1];
    //décodage du token en objet et vérification 
    const decodedToken = jwt.verify(token, `${secretKey}`);
  
    const userId = decodedToken.userId;
    //on vérifie que le userID venant du front = celui du token
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID invalide !";
    } else {
      //si les "userId" sont les mêmes
      next();
    }
  } catch {
    //erreurs authentification
    res.status(401).json({ error: new Error("Requête non authentifiée !") });
  }
};
*/