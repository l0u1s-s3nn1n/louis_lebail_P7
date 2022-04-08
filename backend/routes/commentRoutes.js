//Import
const express = require("express");
//Permets de gérer les routes
const router = express.Router();
//Controller
const commentCtrl = require("../controllers/commentControllers");
//const { checkPreviousPost } = require("../controllers/postController");
//Import du middle d'authentifictaion pour les accès aux routes
const auth = require("../middlewares/authMiddlewares");

//Définition des routes de l'API
router.get("/", auth, commentCtrl.getAllComments);
router.post("/", auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.checkPreviousComment, commentCtrl.modifyComment);
router.delete("/:id", auth, commentCtrl.checkPreviousComment, commentCtrl.deleteComment);

module.exports = router;
