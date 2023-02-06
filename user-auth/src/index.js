import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'      //npm install react-router-dom@5.2.0

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  
)
