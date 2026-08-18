import React from 'react'
import Signup from './components/Signup'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signup />} />

    </Routes>
  )
}
