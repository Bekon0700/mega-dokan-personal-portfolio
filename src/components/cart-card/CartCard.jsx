import React, { useContext } from 'react'
import { cartContext } from '../../context/CartProvider'

const CartCard = ({product, delOpt}) => {
  const {productClrHandler} = useContext(cartContext)
    const {price, discountPercentage, thumbnail, productName, quantity, _id} = product
    const discount = (price * 1) * ((discountPercentage * 1) / 100)
    const discountPrice = ((price * 1) - discount) * quantity
  return (
    <div className='flex flex-row lg:flex-row border-t-2 border-gray-300 py-8 gap-3 lg:gap-6'>
        <img src={thumbnail} alt="" className='w-24 h-24  lg:w-56 lg:h-56 mx-auto shadow-2xl rounded-md'/>
        <div className='flex justify-between w-full'>
            <div>
                <p className='text-sm lg:text-3xl font-semibold text-gray-900'>{productName} X {quantity}</p>
               {
                delOpt ?
                <button onClick={() => productClrHandler(_id)} className='link text-sm lg:text-lg text-blue-500 py-2 lg:py-2'>delete</button>
                :
                ''
               }
            </div>
            <div>
            <p className='text-lg lg:text-2xl font-semibold text-gray-900'>${discountPrice.toFixed(2)}</p>
            </div>
        </div>

    </div>
  )
}

export default CartCard