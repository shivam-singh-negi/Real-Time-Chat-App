import React from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { ChatContext } from '../../Context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import { useContext } from 'react';
import { Stack } from 'react-bootstrap';
import moment from "moment"
export const ChatBox = () => {
    const {user}=useContext(AuthContext);
    const {currentChat,messages,isMessagesLoading}=useContext(ChatContext);
    const {recipientUser}=useFetchRecipientUser(currentChat,user);
   console.log(recipientUser)
   if(!recipientUser)
   return(
    <p>No conversation selected yet...</p>
   )
   if(isMessagesLoading)
   return(
    <p style={{textAlign:"center",width:"100%"}}>Loading chat...</p>
   )
   
   return <Stack gap={4} className="chat-box">
    <div className='chat-header'>
    <strong>{recipientUser?.user.name}</strong></div>
    <Stack gap={2} className="messages">
  {messages &&
    messages.map((text, index) => (
      <Stack key={index} className={`${text?.senderId===user?._id ? "message self align-self-end flex-grow-0":"message self align-self-start flex-grow-0"}`}>
        <span>{text.message}</span>
        <span className="message-footer">{moment(text.createdAt).calendar()}</span>
      </Stack>
    ))}
</Stack>




    </Stack>

  
}
