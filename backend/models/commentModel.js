//Import 
const { Model, DataTypes } = require("sequelize"); //Demande la DB pour injecter le model
const sequelize = require("../config/database");//Demande la DB pour injecter le model

class Comment extends Model {}

//Schema du model et attributs 
Comment.init(
  {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "comments",
  }
);

module.exports = Comment;
