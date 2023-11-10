import { useContext, useEffect,useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { baseUrl, getRequest } from "../Utils/services";

export const useFetchLatestMessage=(chat)=>{
    const {newMessage,notifications}=useContext(ChatContext)
    const [latestMessage, setLatestMessage]=useState(null);
    
    
    useEffect(()=>{
        const getMessages=async()=>{
        
        const response = await getRequest(`${baseUrl}/messages/fetchMessages/${chat?._id}`); 
            if(response.error){
                return console.log("error getting messages...",error);
                 }
            const lastMessage=response[response?.length-1];
            console.log("lll",lastMessage)
           setLatestMessage(lastMessage);
        }
        getMessages();
    },[newMessage,notifications]);

    return { latestMessage };
}