import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import profileImage from '../images/image1.png'

const favicon = document.querySelector('link[rel="icon"]')
if (favicon) favicon.href = profileImage

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
