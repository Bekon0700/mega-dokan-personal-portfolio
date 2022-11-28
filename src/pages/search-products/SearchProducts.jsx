import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/ProductCard'
import { searchContext } from '../../context/SearchProvider'

const SearchProducts = () => {
    const { searchKey } = useContext(searchContext)
    
    const { data: products = [], isLoading, status } = useQuery({
        queryKey: ['search', searchKey],
        queryFn: async () => {
            const res = await axios.get(`https://inventory-rest-api.vercel.app/api/v1/products/search?item=${searchKey}`)
            return res.data.products
        }
    })
    return (
        <div className='w-5/6 mx-auto py-12'>
            <div className='flex flex-col gap-5'>
                <p className='text-3xl font-bold text-center'>Our Products</p>
                {
                    isLoading &&
                    <div className='h-screen flex justify-center items-center'>
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 "></div>
                    </div>
                }
                {
                    status == 'success' && products.length == 0 &&
                    <div className='h-screen flex justify-center items-center'>
                        <p className='text-3xl text-red-900 font-medium'>No Product found</p>
                    </div>
                }
                <div className='py-12 grid grid-cols-1 lg:grid-cols-4 gap-8'>
                    {
                        products.map(el => <ProductCard key={el._id} product={el} megaDeal={false} />)
                    }

                </div>
            </div>

        </div>
    )
}

export default SearchProducts