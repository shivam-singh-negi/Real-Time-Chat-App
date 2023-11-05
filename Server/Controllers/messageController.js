const messageModel=require("../Models/messageModel.js")

//createMessages
const createMessage=async(req,res)=>{
    const {chatId, senderId, message}=req.body;
    try{
       const text= new messageModel({
            chatId:chatId,
        senderId:senderId,
        message:message
        });

        const response=await text.save();
        res.status(200).json(response)



    }
    catch(error){
        console.log(error);
        res.status(500).json(error)
    }

}


//getting messages
const getMessages=async(req,res)=>{
    try{
        const {chatId}=req.params;

        const messages=await messageModel.find({chatId});
        res.status(200).json(messages);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}



module.exports={createMessage,getMessages}