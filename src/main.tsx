import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Dashboard from './routes/Dashboard.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Wallet } from './components/Connect.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>,
  },
  {
    path: "/dashboard",
    element : <Dashboard/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Wallet>    
      <RouterProvider router={router} />
    </Wallet>
  </React.StrictMode>
)
