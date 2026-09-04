import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login"></Navigate>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )




}

export default App
