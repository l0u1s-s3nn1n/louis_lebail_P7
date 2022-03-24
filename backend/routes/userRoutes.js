const express = require("express");
const {
  getAllUsers,
  getUser,
  saveUser,
  deleteUser,
  updateUser
} = require("../controllers/userControllers");
 
const router = express.Router();
 
// http://localhost:3000/api/users
router.get("/users", getAllUsers);
 
// http://localhost:3000/api/user/id
router.get("/user/:id", getUser);
 
// http://localhost:3000/api/user
/*
{
    "name": "{{$randomFullName}}",
    "email": "{{$randomEmail}}",
}
*/
router.post("/User", saveUser);
 
// http://localhost:3000/api/user/id
/*
{
    "name": "{{$randomFullName}}",
    "email": "{{$randomEmail}}",
}
*/
router.put("/user/:id", updateUser);
 
// http://localhost:3000/api/user/id
router.delete("/user/:id", deleteUser);
 
module.exports = {
  routes: router
};
