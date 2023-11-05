import React, { useContext } from 'react'

import {Container,Nav, Navbar,Stack} from "react-bootstrap"
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
export const NavBar = () => {

    const {user}= useContext(AuthContext);



  return (
   <>
   <Navbar bg="dark" className='mb-5' style={{height:"3.75rem"}}>
    <Container>
        <h2>
            <Link to={"/"} className="link-light text-decoration-none">ChatNow</Link>
        </h2>
        <span className='text-warning'>Logged in as {user?.name}</span>
        <Nav>
            <Stack direction="horizontal" gap={3}>
                <Link to="/login" className="link-light text-decoration-none">Login</Link>
                <Link to="/register"className="link-light text-decoration-none">Register</Link>
            </Stack>
        </Nav>
    </Container>
   </Navbar>

   
   
   </>
  )
}
