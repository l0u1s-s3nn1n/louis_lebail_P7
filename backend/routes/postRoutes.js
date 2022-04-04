const express = require("express");
const postsCtrl = require("../controllers/postControllers");
const auth = require("../middlewares/authMiddlewares");
const multer = require("../middlewares/multerMiddlewares");

const router = express.Router();

// Routes
router.post("/new", auth, multer, postsCtrl.createPost);
router.get("/getPosts", auth, multer, postsCtrl.getAllPosts);
router.get("/user/:id", auth, multer, postsCtrl.getPostProfile);
router.delete("/:id", auth, multer, postsCtrl.deletePost);
router.put("/:id/moderate", postsCtrl.moderatePost);

module.exports = router;