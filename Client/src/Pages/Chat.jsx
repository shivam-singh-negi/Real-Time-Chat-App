import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext.jsx'

export const Chat = () => {
  const {userChat,isUserChatError,isUserChatLoading}=useContext(ChatContext)
  console.log("UserChat:",userChat)
  return (
    <div>Chat</div>
  )
}
