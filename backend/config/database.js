//import sequelize
const { Sequelize } = require("sequelize");

//connection à la BDD
//uuID utilisé pour créer une colonne qui stocke des identifiants universels uniques.
const sequelize = new Sequelize("Groupomania", "Louis", "P@ssword123", {
  dialect: "sqlite",
  host: "./config/groupomaniaDB.sqlite",
});

module.exports = sequelize;
