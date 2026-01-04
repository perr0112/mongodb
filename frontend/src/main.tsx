import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import { UserProvider } from './contexts/user/Provider.jsx'

import "./assets/stylesheets/index.css"

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
)
