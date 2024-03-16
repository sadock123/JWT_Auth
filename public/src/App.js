import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Secret from './pages/Secret.jsx'
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="register" element={<Register/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="/" element={<Secret/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App