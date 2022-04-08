//Import
const express = require("express");
//Permets de gérer les routes
const router = express.Router();
//Controller
const userCtrl = require("../controllers/userController");
//Import du middleware d'authentifictaion pour les accès aux routes

const auth = require('../middlewares/authMiddlewares');

//Définition des routes de l'API
router.post(
  "/signup",
  userCtrl.emailCheck,
  userCtrl.passwordCheck,
  userCtrl.signup
);

router.post("/login", userCtrl.emailCheck, userCtrl.passwordCheck, userCtrl.login);
router.get("/:uuid", auth, userCtrl.getOneUser);
router.get("/", auth, userCtrl.getAllUsers);
router.put("/:uuid", auth,userCtrl.emailCheck, userCtrl.passwordCheck,userCtrl.checkPreviousUser, userCtrl.modifyUser);
router.delete("/:uuid",auth,userCtrl.checkPreviousUser, userCtrl.deleteUser)


module.exports = router;

