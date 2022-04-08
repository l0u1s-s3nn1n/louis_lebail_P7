//Import 
const fs = require("fs");//Créer et gérer des fichiers pour y stocker ou lire des informations

//Models
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//post a beaucoup de comments
Post.hasMany(Comment, { onDelete: "CASCADE" }, { as: "comments" });
//post appartient à user
Post.belongsTo(User, { as: "user" });

//Création d'un post
exports.createPost = (req, res, next) => {
  if (req.file) {
    const post = {
      uuid: req.body.uuid,
      text: req.body.text,
      image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      userId: req.auth.userId,
    };
    Post.create(post)
      .then((post) => {
        res
          .status(201)
          .json({
            message: "Message créé",
            id: post.id,
            image: post.image,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
          })}
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    const post = {
      uuid: req.body.uuid,
      text: req.body.text,
      image: null,
      userId: req.auth.userId,
    };
    Post.create(post)
      .then((post) => {
        res.status(201).json({
          message: "Message créé",
          id: post.id,
          image: post.image,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        });}
      )
      .catch((error) => res.status(400).json({ error }));
  }
};

//Récupération de tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
    attributes: ["id", "uuid", "text", "image", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]]
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

//Suppression fichier lié au post 
function deleteOldFile(oldPost) {
  if (oldPost.image !== null) {
    const filename = oldPost.image.split("/images/")[1];
    fs.unlink(`images/${filename}`, (err) => {
      if (err) throw err;
    });
  }
}


//Vérification 
exports.checkPreviousPost = (req, res, next) => {
  id = req.params.id;

  try {
    Post.findOne({ where: { id: id } })
      .then((post) => {
        if (!post) {
          throw "Message introuvable";
        }
        if (req.auth.uuid !== post.uuid && req.auth.isAdmin === false) {
          throw "Accès refusé (admin)";
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


//Modifier un post
exports.modifyPost = async (req, res, next) => {
  id = req.params.id;
  if (req.file) {
    //on cherche le post
    await Post.findOne({ where: { id: id } })
      .then(deleteOldFile)
      .catch((error) => res.status(500).json({ error }));
    //paramètres du post à modifier et l'utilisateur correspondant
    await Post.update(
      {
        text: req.body.text,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then(() => {
        return Post.findOne({ where: { id: id } });
      })
      //post du post 
      .then((post) => {
        res.status(200).send({
          message: "Message modifié",
          text: post.text,
          image: post.image,
          updatedAt: post.updatedAt,
        });
      })
      .catch((error) => res.status(404).json({ error }));
  }
  
  //Modification des fichiers
  if (!req.file && req.body.image===null){
    await Post.findOne({ where: { id: id } })
      .then(deleteOldFile)
      .catch((error) => res.status(500).json({ error }));

    await Post.update(
      { text: req.body.text, image: null },
      {
        where: {
          id: id,
        },
      }
    )
      .then(() => {
        return Post.findOne({ where: { id: id } });
      })
      .then((post) => {
        res.status(200).send({
          message: "Message modifiée !",
          text: post.text,
          image: post.image,
          updatedAt: post.updatedAt,
        });
      })
      .catch((error) => res.status(404).json({ error }));
  }

  if (!req.file && req.body.image === undefined) {

    await Post.update(
      { text: req.body.text },
      {
        where: {
          id: id,
        },
      }
    )
      .then(()=>{ return Post.findOne({ where: { id: id } })})
      .then((post)=>{
        res.status(200).send({
          message: "Message modifié",
          text: post.text,
          image: post.image,
          updatedAt: post.updatedAt,
        });
      })
      .catch((error) => res.status(404).json({ error }));
  }
};


//Suppression d'un post
exports.deletePost= async (req, res, next) => {
  id = req.params.id;

  await Post.findOne({ where: { id: id } })
    .then(deleteOldFile)
    .catch((error) => res.status(500).json({ error }));

  await Post.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.status(200).send("Post supprimée !"))
    .catch((error) => res.status(404).json({ error }));
};
