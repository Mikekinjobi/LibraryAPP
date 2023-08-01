// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import SignUp from './components/SignUp';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home/>}/> 
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<SignUp/>}/>
         <Route path="*" element ={<ErrorPage/>}/>
      </Routes>      
    </BrowserRouter>
  )
}

export default App
