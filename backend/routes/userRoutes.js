const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/userControllers");
const auth = require("../middlewares/authMiddlewares");

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.delete("/delete", auth, usersCtrl.deleteProfile);
router.get("/myprofile", auth, usersCtrl.userProfile);
router.put("/update", auth, usersCtrl.updateProfile);

module.exports = router;


/*const express = require("express");

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


router.get("/users", auth, getAllUsers);
router.get("/user/:id", auth, getUser);
router.put("/user/:id", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);
router.post("/login", login);
router.post("/user", saveUser);

 
module.exports = {
  routes: router
};*/