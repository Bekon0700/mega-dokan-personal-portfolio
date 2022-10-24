import React from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/ProductCard'

const ProductCategories = () => {
    const { products } = useLoaderData()
    let brands = []
    products.forEach(el => {
        brands.push(el.brand)
    })
    let i = 0
    return (
        <div className='w-11/12 mx-auto py-12'>
            <div className='grid grid-cols-12'>
                <div className='col-span-12 lg:col-span-2'>
                    <p className='text-2xl text-center font-bold pb-4 uppercase'>Our Brands</p>
                    <div className='flex flex-col gap-2'>
                        {
                            brands.map(el => {
                                return (
                                    <Link to={`/brand/${el}`} key={i++} className='text-lg font-semibold text-center border border-black py-2 hover:bg-gray-700 hover:text-purple-100'>{el}</Link>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-10 px-4'>
                    <div className='py-12 grid grid-cols-1 lg:grid-cols-4 gap-4'>
                        {
                            products.map(el => <ProductCard key={el._id} product={el} megaDeal={false} />)
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCategories