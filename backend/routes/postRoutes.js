const router = require("express");
const router = express.Router();
// "auth.js" pour la vérification des tokens
const auth = require("../middlewares/authMiddlewares");

const postController = require("../controllers/postControllers");
const multer = require("../middlewares/multerMiddlewares");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getOnePost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
