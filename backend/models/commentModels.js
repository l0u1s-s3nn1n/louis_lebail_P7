const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentControllers");
const auth = require("../middlewares/authMiddlewares");



router.post("/:id", auth, commentController.newComment);e
router.get("/:id", auth, commentController.getAllPostComments);
router.put("/:id", auth, commentController.modifyComment);
router.delete("/:id", auth, postController.deletePost); 
 
module.exports = router;