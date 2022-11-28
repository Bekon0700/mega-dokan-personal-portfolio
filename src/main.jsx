import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import SearchProvider from './context/SearchProvider'
import CartProvider from './context/CartProvider'
import AuthProvider from './context/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <SearchProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SearchProvider>
      </CartProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
