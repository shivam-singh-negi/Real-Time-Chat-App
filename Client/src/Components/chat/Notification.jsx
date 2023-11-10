import moment from 'moment';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { ChatContext } from '../../Context/ChatContext';
import { unreadNotificationsFunc } from '../../Utils/unreadNotifications';

export const Notification = () => {
    const [isOpen,setIsOpen]=useState(false);
    const {notifications,userChats,allUsers,markAllNotificationsAsRead,markNotificationAsRead}=useContext(ChatContext)
    const {user}=useContext(AuthContext)
    const unreadNotification=unreadNotificationsFunc(notifications);
    const modifiedNotifications=notifications.map((n)=>{
        const sender=allUsers.find((user)=>user._id===n.senderId)
        return{
            ...n,senderName:sender?.name
        }
    })

    console.log("un",unreadNotification);
    console.log("mn",modifiedNotifications)



  return (
<div className="notifications">
    <div className="notifications-icon" onClick={()=>setIsOpen(!isOpen)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
</svg>
{unreadNotification?.length===0?null:(<span className="notification-count"><span>{unreadNotification?.length}</span></span>)}
    </div>
    {
        isOpen? 
    <div className="notifications-box">
        <div className="notifications-header">
            <h3>Notifications</h3>

            <div className="mark-as-read" onClick={()=>markAllNotificationsAsRead(notifications)}>Mark all as read</div>
        </div>
        {modifiedNotifications?.length===0?<span className='notification'>No notification yet...</span>:null}
        {modifiedNotifications && modifiedNotifications.map((n,index)=>{
            return <div key={index} className={n.isRead?"notification":"notification not-read"} 
            onClick={()=>{markNotificationAsRead(n,userChats,user,notifications)
            setIsOpen(false)}}>
                <span >{`${n.senderName} sent you a new Message`}</span>
                <span className='notification-time'>{moment(n.date).calendar()}</span>
            </div>
        })}
    </div>:null}
</div>
    )
}
