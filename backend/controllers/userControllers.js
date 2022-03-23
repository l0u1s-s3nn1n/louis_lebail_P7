const User = require("../models/userModels");
 
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
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
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
 
module.exports = {
  getAllUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser
};

