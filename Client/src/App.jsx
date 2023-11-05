import { useState,useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './Components/NavBar.jsx';
import { Chat } from './Pages/Chat.jsx';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap';
import { AuthContext, AuthContextProvider } from './Context/AuthContext.jsx';


function App() {
  const {user}= useContext(AuthContext);

  return (<>
        <NavBar />

    <Container className="">
      <Routes>
        <Route path="/" element={user?<Chat />:<Login/>} />
        <Route path="/register"element={user?<Chat />:<Register/>} />
        <Route path="/login" element={user?<Chat />:<Login/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
    </>
  );
}

export default App;
