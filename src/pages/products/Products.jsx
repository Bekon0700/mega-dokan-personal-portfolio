import React, { useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import { cartContext } from '../../context/CartProvider'

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const Products = () => {
  const { product } = useLoaderData()
  const { cartHandler } = useContext(cartContext)
  const { price, discountPercentage, rating } = product
  const discount = (price * 1) * ((discountPercentage * 1) / 100)
  const discountPrice = (price * 1) - discount
  return (
    <div className='w-11/12 2xl:w-3/4 mx-auto py-14 lg:py-24'>
      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-12 lg:col-span-3 justify-center'>
          <img src={product.thumbnail} alt={`${product.productName}-thumbnail`} className='h-80 w-full shadow-2xl rounded-md' />
        </div>
        <div className='flex flex-col gap-3 lg:px-3 lg:py-0 col-span-12 lg:col-span-7'>
          <p className='text-3xl font-semibold text-gray-900'>{product.productName}</p>
          <div>
            <p className='text-2xl font-semibold text-gray-900'>${discountPrice.toFixed(2)} <span className='line-through text-base font-normal text-gray-500'>${price}</span></p>
            <p className='text-xl font-semibold text-green-600 pt-1'>Save {discountPercentage}%</p>
          </div>
          <p className='text-base font-semibold text-black'>Rating {rating}</p>
          <p className='text-base font-semibold text-black'>Brand: {product.brand}</p>
          <p className='text-base font-semibold text-amber-800'>Stock: {product.stock}</p>
          <p className='text-sm font-normal text-amber-800'>Description: {product.description}</p>
        </div>
        <div className='flex flex-col gap-4 justify-between col-span-12 lg:col-span-2 shadow-md p-4 rounded-2xl shadow-green-300 shadow-t-md'>
          <p className='text-2xl font-semibold text-gray-900'>${discountPrice.toFixed(2)}</p>
          <p className='text-sm xl:text-base 2xl:text-lg font-normal text-gray-900'>$5.50 Shipping & Import Fees Deposit to Bangladesh Details</p>
          <p className='text-lg font-semibold text-gray-900'>Delivery within 7 working days</p>
          <button onClick={() => cartHandler(product)} className='bg-yellow-200 text-lg xl:text-xl font-semibold text-gray-900  py-2 rounded-md'>add to cart</button>
        </div>
      </div>
      <div className='border border-black my-12 rounded-md'>
        <p className='text-2xl font-semibold text-gray-900 text-center pt-4 underline uppercase'>Product showcase</p>
        <PhotoProvider>
          <div className='flex flex-col lg:flex-row gap-8 lg:gap-4 py-12 lg:px-3 flex-wrap items-center justify-center'>
            {
              product?.images.map((el, id) => <PhotoView key={id} src={el}>
                <img src={el} alt={`${product.productName}-thumbnail`} className=' w-11/12 lg:h-60 lg:w-60 shadow-2xl rounded-md' />
              </PhotoView>
              )
            }
          </div>
        </PhotoProvider>
      </div>
    </div>
  )
}

export default Products