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
    phone: req.body.phone
  };
  await User.create(profile).then(() => {
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
          phone: req.body.phone
        })
        .then(() => {
          res.sendStatus(204);
        });
    } else {
      res.sendStatus(404);
    }
  });
};
 
const deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.findByPk(id).then((item) => {
    if (item != null) {
      item.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
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

