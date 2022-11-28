import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import ProductCard from '../../components/product-card/ProductCard'

const AllProducts = () => {
    const [page, setPage] = useState(1)
    // const [products, setProducts] = useState([])
    // useEffect(() => {
    //     const apiCall = async () => {
    //         const res = await fetch(`https://inventory-rest-api.vercel.app/api/v1/products?page=${page}`)
    //         const data = await res.json()
    //         setProducts(data.products)
    //     }
    //     apiCall()
    // }, [page])


    const { data: products = [], isLoading, status } = useQuery({
        queryKey: ['all-products', page],
        queryFn: async () => {
            const res = await axios.get(`https://inventory-rest-api.vercel.app/api/v1/products?page=${page}`)
            return res.data.products
        },
        keepPreviousData: true
    })
    const prevBtnHandler = () => {
        if(page > 1){
            setPage(page-1)
        }
    }
    const nxtBtnHandler = () => {
        if(products.length >= 15){
            setPage(page+1)
        }else if(products.length < 15){
            setPage(1)
        }
    }

    return (
        <div className='w-5/6 mx-auto py-12'>

            <div className='flex flex-col gap-5'>
                <p className='text-3xl font-bold text-center'>Our Products</p>
                <div className='py-12 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
                    {
                        products.map(el => <ProductCard key={el._id} product={el} megaDeal={false} />)
                    }

                </div>
            </div>

            <div className='flex justify-center py-8'>
                <div className="btn-group">
                    <button onClick={() => prevBtnHandler()} className="btn">«</button>
                    <button className="btn">Page {page}</button>
                    <button onClick={() => nxtBtnHandler()} className="btn">»</button>
                </div>
            </div>
        </div>
    )
}

export default AllProducts