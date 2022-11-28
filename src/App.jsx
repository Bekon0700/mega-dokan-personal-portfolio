import { Toaster } from 'react-hot-toast'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Main from './components/layout/main-layout/Main'
import AllProducts from './pages/all-products/AllProducts'
import Cart from './pages/cart/Cart'
import CheckOut from './pages/check-out/CheckOut'
import Error from './pages/error/Error'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import ProductsBrand from './pages/products-brand/ProductsBrand'
import ProductCategories from './pages/products-categories/ProductCategories'
import Products from './pages/products/Products'
import Registration from './pages/registration/Registration'
import SearchProducts from './pages/search-products/SearchProducts'
import ProtectedRoute from './protected-route/ProtectedRoute'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          loader: async () => {
            return fetch('https://inventory-rest-api.vercel.app/api/v1/products/top-10-deals')
          },
          element: <Home />
        },
        {
          path: 'product/:id',
          loader: async ({params}) => {
            return fetch(`https://inventory-api-personal.herokuapp.com/api/v1/products/${params.id}`)
          },
          element: <Products />
        },
        {
          path: 'home',
          loader: async () => {
            return fetch('https://inventory-api-personal.herokuapp.com/api/v1/products/top-10-deals')
          },
          element: <Home />
        },
        {
          path: 'category/:id',
          loader: async ({params}) => {
            return fetch(`https://inventory-api-personal.herokuapp.com/api/v1/products/category/${params.id}`)
          },
          element: <ProductCategories />
        },
        {
          path: 'brand/:id',
          loader: async ({params}) => {
            return fetch(`https://inventory-api-personal.herokuapp.com/api/v1/products/brand/${params.id}`)
          },
          element: <ProductsBrand />
        },
        {
          path: 'all-products',
          element: <AllProducts />
        },
        {
          path: 'search/:key',
          element: <SearchProducts />
        },
        {
          path: 'cart',
          element: <Cart />
        },
        {
          path: 'checkout',
          element: <ProtectedRoute><CheckOut /></ProtectedRoute>
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Registration />
        },
      ]
    },
  ])

  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
        <Toaster/> 
    </div>
  )
}


// loader: async () => {
//   return fetch('https://inventory-api-personal.herokuapp.com/api/v1/products/')
// },

export default App
