import { createContext,useState,useEffect, useCallback } from "react";
import { getRequest ,baseUrl,postRequest} from "../Utils/services";
import {io} from "socket.io-client"
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
    const [onlineUsers,setOnlineUsers]=useState([]); 
    const [allUsers,setAllUsers]=useState([])
const [socket,setSocket]=useState(null)
const [notifications,setNotifications]=useState([])
console.log("notification",notifications)

useEffect(()=>{
  const newSocket=io("http://localhost:3000")
setSocket(newSocket);
console.log("newsocket",newSocket)

return()=>{
  newSocket.disconnect();
}

},[user])


useEffect(() => {
  if (socket === null) return;

  // Emit the "addNewUser" event to the server
  socket.emit("addNewUser",user?._id);

  // Listen for the "getOnlineUsers" event from the server
  socket.on("getOnlineUsers", (res) => {
    setOnlineUsers(res);
  });

  return ()=>{
    socket.off("getOnlineUsers")
  }
}, [socket]);

//send



useEffect(() => {
  if (socket === null) return;
  const recipientId=currentChat?.members.find((id)=>id!==user?._id)

  // Emit the "addNewUser" event to the server
  socket.emit("sendMessage",{...newMessage,recipientId});

}, [newMessage]);


//receive message && notification

useEffect(() => {
  if (socket === null) return;
  
  socket.on("getMessage",(res)=>{
if(currentChat?._id !== res.chatId)return;
setMessages((prev)=>[...prev,res]);
})

socket.on("getNotification",(res)=>{
  const isChatOpen=currentChat?.members.some(id=>id==res.senderId);
  if(isChatOpen){
    setNotifications(prev=>[{...res,isRead:true},...prev])
  }
  else{
    setNotifications(prev=>[res,...prev])
  }
})

 return ()=>{
  socket.off("getMessage")  
  socket.off("getNotification")  

 }
}, [socket,currentChat]);




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
        setAllUsers(response)
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
    }, [user,notifications]);
  
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
  
    const markAllNotificationsAsRead=useCallback((notifications)=>{
      const mNotification=notifications.map(n=>
      {return {...n,isRead:true}});
      setNotifications(mNotification)
    },[])

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


const markNotificationAsRead=useCallback(
  (n,userChats,user,notifications)=>{
  const desiredChat=userChats.find(chat=>{
    const chatMembers=[user._id,n.senderId]
       const isDesiredChat=chat?.members.every((member)=>{
      return chatMembers.includes(member);})

    return isDesiredChat
  })
  //mark now notification as read
  const mNotifications=notifications.map(el=>{
    if(n.senderId===el.senderId){
      return {...n,isRead:true}
    }
    else{
      return el
    }
  })
  updateCurrentChat(desiredChat)
  setNotifications(mNotifications)
},[])




    const sendTextMessage=useCallback(async(textMessage,sender,currentChatId,setTextMessage)=>{
if(!textMessage)return console.log("You must type something");
const response=await postRequest(`${baseUrl}/messages`,JSON.stringify({
  "chatId":currentChatId,
  "senderId":sender._id,
  "message":textMessage
}))

console.log("ress",response)
if (response.error){return setSendTextMessageError(response)}
setNewMessage(response)
setMessages((prev)=>[...prev,response]);
setTextMessage("")
    },[])

const markThisUserNotificationsAsRead=useCallback((thisUserNotifications,notifications)=>{
  const mNotifications=notifications.map((el)=>{
    let notification;
    thisUserNotifications.forEach(n=>{
      if(n.senderId===el.senderId){
        notification={...n,isRead:true}

      }
      else{
        notification=el
      }
    })
    return notification;
  })

setNotifications(mNotifications)
},[])


    return (
      <ChatContext.Provider value={{ userChats, isUserChatsError, isUserChatsLoading,potentialChats,setPotentialChats,createChat,currentChat,updateCurrentChat,messages,isMessagesLoading,messagesError,sendTextMessage,onlineUsers,notifications,allUsers,markAllNotificationsAsRead,markNotificationAsRead,markThisUserNotificationsAsRead,newMessage
      }}>
        {children}
      </ChatContext.Provider>
    );
  };