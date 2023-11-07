import { createContext,useState,useEffect, useCallback } from "react";
import { getRequest ,baseUrl,postRequest} from "../Utils/services";

export const ChatContext= createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsError, setUserChatsError] = useState(false);
    const [isUserChatsLoading, setUserChatsLoading] = useState(false);
    const [potentialChats,setPotentialChats]=useState([])
    const [currentChat,setCurrentChat]=useState(null);
    const [messages,setMessages]=useState(null)
    const [isMessagesLoading,setIsMessagesLoading]=useState(false)
    const [messagesError,setMessagesError]=useState(null);
    const [sendTextMessageError,setSendTextMessageError]=useState(null);
    const [newMessage,setNewMessage]=useState(null)




    useEffect(()=>{
      const getUsers=async()=>{
        const response=await getRequest(`${baseUrl}/users/getAllUsers`);
        if(response.error)return console.log("Error Fetching users",response);

        const pChats=response.filter((u)=>{
          let isChatCreated=false;
          if (user && user._id && u && u._id && user._id === u._id) {
            return false;
          }          if(userChats){
           isChatCreated= userChats?.some((chat)=>{return chat.members[0]===u._id||
          chat.members[1]===u._id})
          }
          return !isChatCreated
        })
        setPotentialChats(pChats)
        console.log("pc",pChats)
      }
      getUsers();
    },[userChats])

    useEffect(() => {
      const getUserChats = async () => {
        if (user?._id) {
          setUserChatsLoading(true);
          setUserChatsError(null);
  
          try {
            const response = await getRequest(`${baseUrl}/chats/${user._id}`); // Assuming getRequest is defined
            setUserChatsLoading(false);
  
            if (response.error) {
              setUserChatsError(response);
            } else {
              setUserChats(response);
            }
          } catch (error) {
            // Handle any request errors here
            setUserChatsLoading(false);
            setUserChatsError(error);
          }
        }
      };
  
      getUserChats();
    }, [user]);
  
 console.log("messages",messages)
    useEffect(() => {
      const getMessages = async () => {
          setIsMessagesLoading(true);
          setMessagesError(null);
  
            const response = await getRequest(`${baseUrl}/messages/fetchMessages/${currentChat?._id}`); // Assuming getRequest is defined
            setIsMessagesLoading(false);
  
            if (response.error) {
             
            return setMessagesError(response);
            }
            // Handle any request errors here
           setMessages(response)
        
      };
  
      getMessages();
    }, [currentChat]);
  

    const createChat=useCallback(async(firstId,secondId)=>{
      const response=await postRequest(`${baseUrl}/chats`,JSON.stringify({
        firstId,secondId
      }));

      if(response.error)return console.log("Error Creating Chat",response);
      setUserChats((prev)=>[...prev,response]);
      
    },[]);


    const updateCurrentChat=useCallback((chat)=>{
      setCurrentChat(chat)
    },[])



    const sendTextMessage=useCallback(async(textMessage,sender,currentChatId,setTextMessage)=>{
if(!textMessage)return console.log("You must type something");
const response=await postRequest(`${baseUrl}/messages`,JSON.stringify({
  "chatId":currentChatId,
  "senderId":sender,
  "message":textMessage
}))

console.log("ress",response)
if (response.error){return setSendTextMessageError(response)}
setNewMessage(response.message)
setMessages((prev)=>[...prev,response]);
setTextMessage("")
    },[])




    return (
      <ChatContext.Provider value={{ userChats, isUserChatsError, isUserChatsLoading,potentialChats,setPotentialChats,createChat,currentChat,updateCurrentChat,messages,isMessagesLoading,messagesError,sendTextMessage}}>
        {children}
      </ChatContext.Provider>
    );
  };