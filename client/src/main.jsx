import { createContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserStore from './store/UserStore'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: 1000 * 60 * 5
  //   }
  // }
})

export const Context = createContext(null)

createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
    user: new UserStore
  }}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Context.Provider>
)
