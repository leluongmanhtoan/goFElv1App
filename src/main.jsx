import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss'
import './styles/auth/signin.scss'
import App from './views/App.jsx'

//export const API_BASE_URL = "https://api.codelo.life:8443/api/v1";
export const API_BASE_URL = "http://localhost:8080/api/v1";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
