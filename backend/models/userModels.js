const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multerMiddlewares");

const userController = require("../controllers/userControllers");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;




/*const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }*/