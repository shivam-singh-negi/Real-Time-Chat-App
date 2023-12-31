import React, { useContext } from 'react'

import {Container,Nav, Navbar,Stack} from "react-bootstrap"
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { Notification } from './chat/Notification';
export const NavBar = () => {

    const {user,logoutUser}= useContext(AuthContext);



  return (
   <>
   <Navbar  className='mb-5' style={{height:"3.75rem",backgroundColor:"green"}}>
    <Container>
        <h2>
            <Link to={"/"} className="link-light text-decoration-none">ChattyChat.com</Link>
        </h2>
        { user && (<>
                        <span className='text-warning'>Welcome {user?.name}</span>
                </>)}
        <Nav>
            <Stack direction="horizontal" gap={3}>
               {
                user && (<>
                <Notification/>
                <Link to="/login" onClick={()=>logoutUser()} className="link-light text-decoration-none">Logout</Link>
                </>)
               }
               {!user && <> <Link to="/login" className="link-light text-decoration-none">Login</Link>
                <Link to="/register"className="link-light text-decoration-none">Register</Link>
       </>}
                    </Stack>
        </Nav>
    </Container>
   </Navbar>

   
   
   </>
  )
}
