import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './app.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home.jsx';
import Nivel from './routes/Nivel.jsx';
import Desenvolvedor from './routes/Desenvolvedor.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/nivel',
        element: <Nivel />
      },
      {
        path: '/desenvolvedores',
        element: <Desenvolvedor />
      }    
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
