const mongoose=require("mongoose")
const messageSchema=new mongoose.Schema(
    {
        chatId:String,
        senderId:String,
        message:String
    },{
        timestamps:true
    }
)
const messsageModel=mongoose.model("Message",messageSchema);
module.exports=messsageModel;