//Import
const express = require("express");
//Permets de gérer les routes
const router = express.Router();
//Controller
const postCtrl = require("../controllers/postController");
//Import du middleware permettant l'envoie de fichier via http
const multer = require("../middlewares/multerMiddlewares");
//Import du middleware d'authentifictaion pour les accès aux routes
const auth = require("../middlewares/authMiddlewares");

//Définition des routes de l'API
router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.checkPreviousPost ,postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.checkPreviousPost, postCtrl.deletePost);

module.exports = router;
