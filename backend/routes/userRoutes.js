const express = require("express");

const {
  getAllUsers,
  getUser,
  saveUser,
  deleteUser,
  updateUser,
  login
} = require("../controllers/userControllers");
 
const router = express.Router();
const auth = require("../middlewares/authMiddlewares");


router.get("/users",  auth, getAllUsers);
router.get("/user/:id", auth, getUser);
router.post("/user", saveUser);
router.put("/user/:id", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);
router.post("/login", login);

 
module.exports = {
  routes: router
};