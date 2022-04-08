const { Model, DataTypes } = require("sequelize");//Demande la DB pour injecter le model
const sequelize = require("../config/database");//Demande la DB pour injecter le model

//Appel fonction
class User extends Model {}
//Création du model
User.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Nom déjà utilisé",
      },
      validate: {
        notEmpty: {
          msg: "Veuillez choisir un nom",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Email déjà utilisé",
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;
