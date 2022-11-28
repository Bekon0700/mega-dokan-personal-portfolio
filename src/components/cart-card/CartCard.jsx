import React, { useContext } from 'react'
import { cartContext } from '../../context/CartProvider'

const CartCard = ({ product, delOpt }) => {
  const { productClrHandler } = useContext(cartContext)
  const { price, discountPercentage, brand, thumbnail, productName, quantity, _id } = product
  const discount = (price * 1) * ((discountPercentage * 1) / 100)
  const discountPrice = ((price * 1) - discount) * quantity
  return (
    // <div className='flex flex-row lg:flex-row py-8 gap-3 lg:gap-6'>
    <div className='grid grid-cols-12'>
      <div className='col-span-8 flex gap-6'>
        <img src={thumbnail} alt="" className='w-[86px] h-full  lg:w-32 lg:h-32 rounded-sm' />
        <div className='flex flex-col justify-between'>
          <div>
            <p className='text-sm lg:text-lg font-medium text-gray-900'>{productName}</p>
            <p className='text-base text-gray-800 mt-2'>{brand}</p>
          </div>
          <div>
            {
              delOpt ?
                <button onClick={() => productClrHandler(_id)} className='text-sm lg:text-base text-gray-500 capitalize'>remove</button>
                :
                ''
            }
          </div>
        </div>
      </div>
      <div className='col-span-2 text-center'>
        <p className='text-sm lg:text-lg font-medium text-gray-900'>{quantity}</p>
      </div>
      <div className='col-span-2 text-center'>
        <p className='text-base lg:text-lg font-semibold text-gray-900'>${discountPrice.toFixed(2)}</p>
      </div>

    </div>
  )
}

export default CartCard