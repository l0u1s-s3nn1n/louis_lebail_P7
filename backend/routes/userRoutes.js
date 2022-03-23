const express = require("express");
const {
  getAllUsers,
  getUser,
  saveUser,
  deleteUser,
  updateUser
} = require("../controllers/userControllers");
 
const router = express.Router();
 
// http://localhost:3005/api/profiles
router.get("/users", getAllUsers);
 
// http://localhost:3005/api/profile/id
router.get("/user/:id", getUser);
 
// http://localhost:3005/api/profile
/*
{
    "name": "{{$randomFullName}}",
    "email": "{{$randomEmail}}",
    "phone": "{{$randomPhoneNumber}}"
}
*/
router.post("/User", saveUser);
 
// http://localhost:3005/api/profile/id
/*
{
    "name": "{{$randomFullName}}",
    "email": "{{$randomEmail}}",
}
*/
router.put("/user/:id", updateUser);
 
// http://localhost:3005/api/profile/id
router.delete("/user/:id", deleteUser);
 
module.exports = {
  routes: router
};
