import React, { useContext } from 'react'
import { Container, Stack } from 'react-bootstrap'
import {UserChat} from '../Components/chat/UserChat.jsx'
import { ChatContext } from '../Context/ChatContext.jsx'
import {AuthContext} from "../Context/AuthContext.jsx"
import { PotentialChats } from '../Components/chat/PotentialChats.jsx'
import { ChatBox } from '../Components/chat/ChatBox.jsx'
export const Chat = () => {
  const {user}=useContext(AuthContext)
  const { userChats, isUserChatsError, isUserChatsLoading,updateCurrentChat}=useContext(ChatContext)
  
  return (
    <Container>
      <PotentialChats/>
  {
    userChats?.length<1? null:(
      <Stack direction='horizontal' gap={4} className="align-items-start">
        <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
          {
            isUserChatsLoading && <p>Loading chats...</p>
          }
          {userChats?.map((chat,index)=>{
            return(
              <div key={index} onClick={()=>updateCurrentChat(chat)}>
                <UserChat chat={chat} user={user}/> 
                </div>
            )
          })
          }
          
        </Stack>
<ChatBox/>
      </Stack>
    )
  }
</Container>

  )
}
