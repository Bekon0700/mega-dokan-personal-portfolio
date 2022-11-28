import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import CartCard from '../../components/cart-card/CartCard'
import { cartContext } from '../../context/CartProvider'

const Cart = () => {
    const { cart, totalPrice, cartClrHandler } = useContext(cartContext)
    const totalBill = totalPrice + 5
    if(cart.length == 0){
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className='text-lg font-medium'>Please add some items to the cart first!</p>
            </div>
        )
    }

    return (
        <div className='w-11/12 lg:w-5/6 mx-auto py-6 min-h-screen'>
            <div className='py-8 grid grid-cols-12 gap-10 lg:gap-0'>
                <div className='col-span-12 lg:col-span-8'>
                    <div className='flex justify-between items-center'>
                        <p className='text-2xl font-semibold text-gray-900'>Shopping Cart</p>
                        <p className='text-xl font-medium '>Items {cart?.length}</p>
                    </div>
                    <div className="divider"></div>
                    <div className='grid grid-cols-12 uppercase text-xs lg:text-sm'>
                        <p className='col-span-8'>Product details</p>
                        <p className='col-span-2 text-center'>Quantity</p>
                        <p className='col-span-2 text-center'>Discount price</p>
                    </div>
                    <div className='flex flex-col gap-8 mt-6'>
                        {
                            cart.map(el => <CartCard key={el._id} product={el} delOpt={true} />)
                        }
                    </div>
                    {
                        !cart.length ?
                            <p className='text-center text-2xl font-semibold py-12'>No Item in the cart</p>
                            :
                            <div className='flex flex-col gap-4 justify-center pt-8'>
                                <button onClick={cartClrHandler} className='bg-red-800 py-2 text-base lg:text-base font-medium uppercase text-white w-full rounded-md text-center'>Clear Cart</button>
                            </div>
                    }
                </div>

                <div className='col-span-12 lg:col-span-4 lg:w-3/5 lg:mx-auto'>
                    <p className='text-2xl font-semibold text-gray-900'>Order Summary</p>
                    <div className="divider"></div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium '>Total Items</p>
                            <p className='text-base font-medium'>{cart?.length}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium'>Total price</p>
                            <p className='text-base font-medium'>${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-base font-medium'>Shipping Charge</p>
                            <p className='text-base font-medium'>$5.00</p>
                        </div>
                        <div className='flex justify-between items-center mt-8 pt-2 border-t border-gray-600'>
                            <p className='text-base font-medium'>Total Bill</p>
                            <p className='text-base font-bold'>${totalBill.toFixed(2)}</p>
                        </div>
                        <Link to='/checkout' className='bg-blue-700 py-2 text-sm lg:text-base uppercase font-medium text-white w-full rounded-sm text-center'>Click here to proceed </Link>

                    </div>

                </div>

                {/* {
                !cart.length ?
                ''
                :
                <div className='flex justify-end'>
                    <p className='text-lg lg:text-2xl font-semibold text-green-800'>Total Price: ${totalPrice.toFixed(2)}</p>
                </div>
            }
            {
                !cart.length ?
                <p className='text-center text-2xl font-semibold py-12'>No Item in the cart</p>
                :
                <div className='flex flex-col gap-4 justify-center pt-8'>
                    <Link to='/checkout' className='bg-green-600 py-2 text-base lg:text-lg font-semibold uppercase text-white w-full rounded-md text-center'>Click here to proceed </Link>
                    <button onClick={cartClrHandler} className='bg-red-800 py-2 text-base lg:text-lg font-semibold uppercase text-white w-full rounded-md text-center'>Clear Cart</button>
                </div>
            } 
            */}
            </div>
        </div>
    )
}

export default Cart