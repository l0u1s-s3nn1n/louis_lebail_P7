//Import models
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

//comment appartient à user
Comment.belongsTo(User, { as: "user" });

//Création d'un commentaire
exports.createComment = (req, res, next) => {
  const comment = {
    uuid: req.body.uuid,
    postId: req.body.postId,
    text: req.body.text,
    userId: req.auth.userId,
  };
  Comment.create(comment)
    .then((comment) => {
      res
        .status(201)
        .json({
          message: "Commentaire posté",
          id: comment.id,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        });
    })
    .catch((error) => res.status(400).json({ error }));
};

//Récupérer l'ensemble des commentaires d'un user
exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
    attributes: [
      "id",
      "uuid",
      "text",
      "postsId",
      "createdAt",
      "updatedAt",
    ],
    order: [["createdAt", "ASC"]],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(404).json({ error }));
};

exports.checkPreviousComment = (req, res, next) => {
  id = req.params.id;

  try {
    Comment.findOne({ where: { id: id } })
      .then((comment) => {
        if (!comment) {
          throw "Commentaire introuvable";
        }
        if (req.auth.uuid !== comment.uuid && req.auth.isAdmin === false) {
          throw "Accès refusé (non admin)";
        } else {
          next();
        }
      })
      .catch((error) => {
        res.status(401).json(error);
      });
  } catch (error) {
    res.status(401).json({ error: error || "Erreur" });
  }
};


//Modifier un commentaire
exports.modifyComment = (req, res, next) => {
  id = req.params.id;
  Comment.update(
    { text: req.body.text },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      return Comment.findOne({ where: { id: id } });
    })
    .then((comment) => {
      res.status(200).send({
        message: "Commentaire modifié",
        text: comment.text,
        updatedAt: comment.updatedAt,
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  id = req.params.id;
  Comment.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.status(200).send("Commentaire supprimé"))
    .catch((error) => res.status(404).json({ error }));
};
