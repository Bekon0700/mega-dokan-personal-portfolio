import React, { createContext, useEffect, useState } from 'react'

export const cartContext = createContext()


const CartProvider = ({children}) => {
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const cartHandler = (product) => {
    setCart([...cart, product])
  }
  const cartClrHandler = () => {
    setCart([])
  }

  useEffect(() => {
    let p = 0
    cart.forEach(product => {
      p += totalCalculate(product)
    })

    setTotalPrice(p)
  }, [cart])

  const totalCalculate = (product) => {
    const {price, discountPercentage} = product
    const discount = (price * 1) * ((discountPercentage * 1) / 100)
    const discountPrice = (price * 1) - discount
    return discountPrice
  }
  const value = {
    cart,
    totalPrice,
    cartHandler,
    cartClrHandler
  }
  return (
    <cartContext.Provider value={value}>
        {children}
    </cartContext.Provider>
  )
}

export default CartProvider