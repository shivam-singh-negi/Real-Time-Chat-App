import { createContext,useState,useEffect, useCallback } from "react";
import { getRequest ,baseUrl,postRequest} from "../Utils/services";

export const ChatContext= createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsError, setUserChatsError] = useState(false);
    const [isUserChatsLoading, setUserChatsLoading] = useState(false);
    const [potentialChats,setPotentialChats]=useState([])
    useEffect(()=>{
      const getUsers=async()=>{
        const response=await getRequest(`${baseUrl}/users/getAllUsers`);
        if(response.error)return console.log("Error Fetching users",response);
        console.log("hiii",response)

        const pChats=response.filter((u)=>{
          let isChatCreated=false;
          if(user._id===u._id)return false;
          if(userChats){
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
  


    const createChat=useCallback(async(firstId,secondId)=>{
      const response=await postRequest(`${baseUrl}/chats`,JSON.stringify({
        firstId,secondId
      }));

      if(response.error)return console.log("Error Creating Chat",response);
      setUserChats((prev)=>[...prev,response]);
      
    },[]);
    return (
      <ChatContext.Provider value={{ userChats, isUserChatsError, isUserChatsLoading,potentialChats,setPotentialChats,createChat}}>
        {children}
      </ChatContext.Provider>
    );
  };