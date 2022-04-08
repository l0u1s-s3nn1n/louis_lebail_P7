//Imports
const { Model, DataTypes } = require("sequelize");//Permet de créer un model table dans la DB
const sequelize = require("../config/database");//Demande la DB pour injecter le model


//Construction du model
class Post extends Model {}

Post.init(
  {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "posts",
  }
);

module.exports = Post;
