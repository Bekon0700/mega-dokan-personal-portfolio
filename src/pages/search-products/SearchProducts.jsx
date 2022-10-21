import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/ProductCard'
import { searchContext } from '../../context/SearchProvider'

const SearchProducts = () => {
    const param = useParams()
    const [products, setProducts] = useState([])
    const {searchKey} = useContext(searchContext)
    useEffect(() => {
        
        const apiCall = async () => {
            const res = await fetch(`https://inventory-api-personal.herokuapp.com/api/v1/products/search?item=${param.key}`)
            const data = await res.json()
            setProducts(data.products)
        }
        apiCall()
    }, [searchKey])
    return (
        <div className='w-5/6 mx-auto py-12'>

            <div className='flex flex-col gap-5'>
                <p className='text-3xl font-bold text-center'>Our Products</p>
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