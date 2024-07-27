import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Dashboard from './routes/Dashboard.tsx'
import './index.css'
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import allConnections from './connectors'
import {  createBrowserRouter,  RouterProvider } from "react-router-dom";

const connections: [Connector, Web3ReactHooks][] = allConnections.map(([connector, hooks]) => [connector, hooks])


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
    <Web3ReactProvider connectors={connections}>
      <RouterProvider router={router} />
    </Web3ReactProvider>
  </React.StrictMode>
)
