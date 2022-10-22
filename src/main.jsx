import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import SearchProvider from './context/SearchProvider'
import CartProvider from './context/CartProvider'
import AuthProvider from './context/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <SearchProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SearchProvider>
    </CartProvider>
  </React.StrictMode>
)
