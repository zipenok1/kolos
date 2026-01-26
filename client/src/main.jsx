import { createContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import UserStore from './store/UserStore'
import App from './App.jsx'
import './index.css'

export const Context = createContext(null)

createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
    user: new UserStore
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
)
