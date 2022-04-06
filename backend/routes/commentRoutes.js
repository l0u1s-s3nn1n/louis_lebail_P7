
//package "express"
const express = require("express");

//"router" pour les routes "sauce"
const router = express.Router();

// "auth.js" pour la vérification des tokens
const auth = require("../middlewares/authMiddlewares");

//controllers/sauce
const commentController = require("../controllers/commentControllers");

//routes pour "sauce"
router.get("/:id/", auth, commentController.getAllComment);
router.post("/", auth, multer, commentController.createComment);
router.put("/:id", auth, multer, commentController.modifyComment);
router.delete("/:id", auth, commentController.deleteComment);
//router.post("/:id/like", commentController.modifyLikeComment);

//exportation router
module.exports = router;