import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider } from '@material-tailwind/react'
import Header from './components/Header'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Header />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
