import { useState } from 'react'
import {Routes,Route,Navigate} from "react-router-dom"
import { Chat } from './Pages/Chat.jsx'
import { Login } from './Pages/Login'
import { Register } from './Pages/Register'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Routes>
<Route path="/" element={<Chat/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="*" element={<Navigate to={"/"}/>}/>


</Routes>


    </>
  )
}

export default App
