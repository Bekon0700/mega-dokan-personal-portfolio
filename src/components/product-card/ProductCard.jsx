import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/CartProvider'

const ProductCard = ({ product, megaDeal }) => {
  const {cartHandler} = useContext(cartContext)
  const {productName, thumbnail, price, discountPercentage, rating, _id} = product
  const discount = (price * 1) * ((discountPercentage * 1) / 100)
  const discountPrice = (price * 1) - discount
  return (
    <div className='mx-auto'>
      <div className="card w-[350px] bg-base-100 rounded-md border shadow-xl">
        <figure><img src={thumbnail} alt="Shoes" className='h-64 w-full' /></figure>
        <div className="card-body p-4 flex flex-col justify-between h-[300px]">
          <h2 className="card-title pb-3">
            <Link to={`/product/${_id}`}><p className='text-2xl font-bold'>{productName}</p></Link>
          </h2>
          <div className='flex flex-col gap-4'>
            <p className='text-2xl font-semibold text-gray-900'>${discountPrice.toFixed(2)} <span className='line-through text-base font-normal text-gray-500'>${price}</span></p>
            {
              megaDeal && <div className="badge badge-secondary p-3">Mega Deal</div>
            }
            <p className='text-xl font-semibold text-green-600'>Save {discountPercentage}%</p>
            <p className='text-base font-semibold text-black'>Rating {rating}</p>
            <button onClick={() => cartHandler(product)} className='btn glass bg-green-400 text-gray-700 font-semibold'>Add to card</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard