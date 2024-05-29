import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

import './app.scss'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  
  return (
    <div className='App'>
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default App
