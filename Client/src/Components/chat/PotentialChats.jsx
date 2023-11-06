import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

import { ChatContext } from '../../Context/ChatContext'

export const PotentialChats = () => {
  const {user}=useContext(AuthContext)
    const {potentialChats,createChat}=useContext(ChatContext)
  return (
    <div className='all-users'>{potentialChats && potentialChats.map((u,index)=>{

      return(
        <div className="single-user" key={index} onClick={()=>createChat(user._id,u._id)}>
  {u.name}
  <span className='user-online'></span>
</div>
      )
    })} </div>

    )
}
