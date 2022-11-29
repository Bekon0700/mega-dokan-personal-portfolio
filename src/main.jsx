import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import SearchProvider from './context/SearchProvider'
import CartProvider from './context/CartProvider'
import AuthProvider from './context/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const queryClient = new QueryClient()

const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <CartProvider>
          <SearchProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SearchProvider>
        </CartProvider>
      </Elements>
    </QueryClientProvider>
  </React.StrictMode>
)
