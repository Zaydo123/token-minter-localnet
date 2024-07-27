import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'


function Banner() {
  return (
    <>
        <h1>Raydium Quick Deploy</h1>
        <h5>A simple tool for deploying your Raydium tokens</h5>
    </>
  )
}

function GoButton() {
  return (
      <Link to="/dashboard">Go to dashboard</Link>
  )
}

function App() {
  //move it to top of screen
 return (
  <>
    <div className="App">
      <Banner/>
      <GoButton/>
    </div>
  </>
  )
}

export default App
