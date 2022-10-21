import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/ProductCard'

const ProductsBrand = () => {
    const { products } = useLoaderData()
    const param = useParams()

    return (
        <div className='w-5/6 mx-auto py-12'>
            <div className='flex flex-col gap-5'>
                <p className='text-3xl font-bold text-center'>Brand: {param.id}</p>
                <div className='py-12 grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {
                        products.map(el => <ProductCard key={el._id} product={el} megaDeal={false} />)
                    }

                </div>
            </div>
        </div>
    )
}

export default ProductsBrand