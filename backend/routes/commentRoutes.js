/// "routes/sauce.js" : routes pour "sauce"

//package "express"
const express = require("express");

//"router" pour les routes "sauce"
const router = express.Router();

// "auth.js" pour la vérification des tokens
const auth = require("../middlewares/auth");

//"multer-config" pour les "images"
const multer = require("../middlewares/multer-config");

//controllers/sauce
const messagesCtrl = require("../controllers/sauce");

//routes pour "sauce"
router.get("/", auth, messagesCtrl.getAllSauces);
router.get("/:id", auth, messagesCtrl.getOneSauce);
router.post("/", auth, multer, messagesCtrl.createSauce);
router.put("/:id", auth, multer, messagesCtrl.modifySauce);
router.delete("/:id", auth, messagesCtrl.deleteSauce);
//router.post("/:id/like", messagesCtrl.modifyLikeSauce);

//exportation router
module.exports = router;