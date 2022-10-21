import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import SearchProvider from './context/SearchProvider'
import CartProvider from './context/CartProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </CartProvider>
  </React.StrictMode>
)
