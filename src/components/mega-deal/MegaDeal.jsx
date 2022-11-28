import React from 'react'
import ProductCard from '../product-card/ProductCard'

const MegaDeal = ({ data }) => {
  const { products } = data
  return (
    <div className='py-12'>
      <div className='text-lg lg:text-3xl font-bold text-center flex flex-col gap-3'>
        <p><span className='text-red-800'>Mega Deal</span> with <span className='text-green-600'>Mega Dokan</span> </p>
        <p className='text-base lg:text-lg'>Collect our highest rating products with an attractive discount</p>
      </div>
      <div className='py-12 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
        {
          products.map(el => <ProductCard key={el._id} product={el} megaDeal={true} />)
        }

      </div>
    </div>
  )
}

export default MegaDeal