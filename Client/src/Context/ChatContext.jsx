import { createContext,useState,useEffect } from "react";
import { getRequest ,baseUrl,postRequest} from "../Utils/services";

export const ChatContext= createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChat, setUserChat] = useState(null);
    const [isUserChatError, setUserChatError] = useState(false);
    const [isUserChatLoading, setUserChatLoading] = useState(false);
  
    useEffect(() => {
      const getUserChat = async () => {
        if (user?._id) {
          setUserChatLoading(true);
          setUserChatError(null);
  
          try {
            const response = await getRequest(`${baseUrl}/chats/${user._id}`); // Assuming getRequest is defined
            setUserChatLoading(false);
  
            if (response.error) {
              setUserChatError(response);
            } else {
              setUserChat(response);
            }
          } catch (error) {
            // Handle any request errors here
            setUserChatLoading(false);
            setUserChatError(error);
          }
        }
      };
  
      getUserChat();
    }, [user]);
  
    return (
      <ChatContext.Provider value={{ userChat, isUserChatError, isUserChatLoading }}>
        {children}
      </ChatContext.Provider>
    );
  };