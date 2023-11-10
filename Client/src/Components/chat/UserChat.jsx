import { Stack } from "react-bootstrap"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import avatar from "../../assets/avtar.svg"
import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { unreadNotificationsFunc } from "../../Utils/unreadNotifications";
const UserChat=({chat,user})=>{
    const {recipientUser}=useFetchRecipientUser(chat,user);
   const {onlineUsers,notifications}=useContext(ChatContext)
   const isOnline=onlineUsers?.some((user)=>user?.userId===recipientUser?.user._id)
   const unreadNotification=unreadNotificationsFunc(notifications);
   const thisUserNotifications=unreadNotification?.filter(
   (n)=>n.senderId===recipientUser?.user._id
   )
    return (
        <>
<Stack direction="horizontal"gap={3} className="user-card align-items-center p-2 justify-content-between" role="button" >
    <div className="d-flex">
        <div className="me-2"><img src={avatar} height="35px"/></div>
        <div className="text-content">
            <div className="name">{recipientUser?.user.name}</div>
            <div className="text">Text Message</div>
        </div>
    </div>
    <div className="d-flex flex-column align-items-end">

        <div className="data">12/12/2022</div>
        <div className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ""}>
            {thisUserNotifications?.length >0 
            ? thisUserNotifications?.length : ""}{console.log(thisUserNotifications.length)}</div>
        <span className={isOnline?"user-online":""}></span>
    </div>
</Stack>
        </>
    )
}
export default UserChat