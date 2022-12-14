import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const cartContext = createContext()


const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const cartHandler = (product) => {
    const exceptProduct = cart.filter(el => el._id != product._id)
    const onlyProduct = cart.filter(el => el._id === product._id)

    if (onlyProduct[0]) {
      product.quantity = onlyProduct[0].quantity + 1
    } else {
      product.quantity = 1
    }
    setCart([...exceptProduct, product])

    toast.success(`${product.productName}, Added to cart successful`)
  }

  const cartClrHandler = () => {
    toast.success('Cart Cleared')
    localStorage.clear()
    setCart([])
  }

  const productClrHandler = (id) => {
    toast.success('Item Removed')
    const exceptProduct = cart.filter(el => el._id != id)
    if (exceptProduct.length == 0) {
      localStorage.clear()
    }
    setCart([...exceptProduct])
  }

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem('cart')) || []
    setCart(store)
  }, [])


  useEffect(() => {
    let cleaner = true
    if (cleaner) {
      let p = 0
      cart.forEach(product => {
        p += totalCalculate(product)
      })

      if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart))
      }
      setTotalPrice(p)
    }

    return () => {
      cleaner = false
    }

  }, [cart])

  const totalCalculate = (product) => {
    const { price, discountPercentage, quantity } = product
    const discount = (price * 1) * ((discountPercentage * 1) / 100)
    const discountPrice = ((price * 1) - discount) * quantity
    return discountPrice
  }
  const value = {
    cart,
    totalPrice,
    cartHandler,
    cartClrHandler,
    productClrHandler
  }
  return (
    <cartContext.Provider value={value}>
      {children}
    </cartContext.Provider>
  )
}

export default CartProvider