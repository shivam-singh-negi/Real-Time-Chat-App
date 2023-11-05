const express=require("express")
const {createMessage,getMessages} =require("../Controllers/messageController.js")

const router=express.Router();

router.post("/",createMessage)
router.get("/fetchMessages/:chatId",getMessages)

module.exports=router