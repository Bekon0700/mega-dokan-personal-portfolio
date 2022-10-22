import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import CartCard from '../../components/cart-card/CartCard'
import { cartContext } from '../../context/CartProvider'

const CheckOut = () => {
    const {cart, totalPrice} = useContext(cartContext)


  return (
    <div className='w-11/12 lg:w-3/4 mx-auto py-12'>
        <div className='shadow-2xl rounded-md px-4 lg:px-12 py-8 shadow-black'>
            <p className='text-3xl font-semibold text-gray-900 pb-8'>Check out</p>
            <div className='flex flex-col gap-4'>
                {
                    cart.map(el => <CartCard key={el._id} product={el} />)
                }
            </div>
            <div className='flex justify-end'>
                <p className='text-lg lg:text-2xl font-semibold text-green-800'>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <div className='flex justify-center pt-8'>
                <Link onClick={checkOutHandler} className='bg-green-300 py-2 text-lg font-bold uppercase text-blue-900 w-full rounded-md text-center'>Payment through stripe</Link>
            </div>
        </div>
    </div>
  )
}

export default CheckOut