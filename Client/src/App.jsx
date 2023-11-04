import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './Components/NavBar.jsx';
import { Chat } from './Pages/Chat.jsx';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap';

function App() {
  const containerStyle = {
    background: 'green', // Correct the style object format
  };

  return (<>
        <NavBar />

    <Container className="">
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
    </>
  );
}

export default App;
