const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");

exports.signup = async (req, res) => {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const role = req.body.role;

	const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const password_regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
	const username_regex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

	// On cherche l'utilisateur dans la bdd

	try {
		if (!email || !username || !password || !role) {
			throw new Error("Vérifier vos informations");
		}

		if (!email_regex.test(email)) {
			throw new Error("Format d'email non correct");
		}

		if (!password_regex.test(password)) {
			throw new Error(
				"Au moins 8 caractères - Au moins 1 minuscule - Au moins une majuscule - 1 number - Au moins un caractères spécial = !@#$%^&*"
			);
		}
		// if (username_regex.test(username)) {
		// 	throw new Error("max 20 characters");
		// }
		// if (username_regex.test(role)) {
		// 	throw new Error("max 20 characters");
		// }

		const oldUser = await models.User.findOne({
			attributes: ["email"],
			where: { email: email }
		});
		if (oldUser) {
			throw new Error("Vous avez déjà un compte");
		}

		const newUser = await models.User.create({
			email: email,
			username: username,
			password: await bcrypt.hash(password, 10),
			role: role,
			isAdmin: 0,
			latent: 1
		});

		if (!newUser) {
			throw new Error("Erreur lors de la création du compte");
		}

		const token =
			"Bearer " +
			jwt.sign({ id: newUser.id }, "SECRET_KEY", { expiresIn: "2H" });

		if (!token) {
			throw new Error("Erreur lors de la vérifcation du token (signup)");
		}

		res.status(201).json({
			user_id: newUser.id,
			email: newUser.email,
			username: newUser.username,
			isAdmin: newUser.isAdmin,
			role: newUser.role,
			latent: newUser.latent,
			token
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const user = await models.User.findOne({
			where: {
				email: req.body.email,
				latent: 1
			}
		});

		if (!user) {
			throw new Error("Compte introuvable (login)");
		}

		const isMatch = await bcrypt.compare(req.body.password, user.password);

		if (!isMatch) {
			throw new Error("Erreur de mot de passe");
		}

		const token =
			"Bearer " + jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "2h" });
		res.status(200).json({
			user: user,
			token
		});

		if (!token) {
			throw new Error("Erreur token pour se log");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.userProfile = async (req, res) => {
	try {
		const user = await models.User.findOne({
			attributes: ["id", "email", "username", "role", "isAdmin", "latent"],
			where: {
				id: req.user.id
			}
		});

		if (!user) {
			throw new Error("Compte introuvable (profile) ");
		}
		res.status(200).json({ user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteProfile = async (req, res) => {
	try {
		const userToFind = await models.User.findOne({
			where: { id: req.user.id }
		});
		if (!userToFind) {
			throw new Error("Compte introuvable (delete)");
		}

		const notLatent = userToFind.update({
			latent: 0
		});

		if (!notLatent) {
			throw new Error("Erreur lors de la maj du compte");
		}

		res.status(200).json({
			message: "Compte supprimé avec succès"
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.updateProfile = async (req, res) => {
	try {
		const userToFind = await models.User.findOne({
			attributes: ["role", "id", "isAdmin", "username"],
			where: { id: req.user.id }
		});

		if (!userToFind) {
			throw new Error("Utilisateur introuvable (update)");
		}

		const userToUpdate = await models.User.update(
			{
				username: req.body.username,
				role: req.body.role,
				isAdmin: req.body.isAdmin
			},
			{
				where: { id: req.user.id }
			}
		);

		if (!userToUpdate) {
			throw new Error("Erreur lors de la maj du compte (update)");
		}
		res.status(200).json({
			user: userToUpdate.isAdmin,
			message: "Compte mise à jour"
		});

		if (!userToUpdate) {
			throw new Error("Erreur lors de la maj (update)");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};




/*const User = require("../models/userModels");
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

*/