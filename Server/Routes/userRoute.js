const express=require("express");
const {registerUser,loginUser,findUser, getAllUsers} =require("../Controllers/userController")


const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/findUser/:userId",findUser);
router.get("/getAllUsers",getAllUsers);




module.exports= router;