import React, { useEffect, useState } from 'react'

import { ImCross } from 'react-icons/im'
import { Link } from 'react-router-dom'

const SideBar = ({ sideBarToggle, setSideBarToggle }) => {
    const [cat, setCat] = useState([])
    useEffect(() => {
        const apiCall = async () => {
            const res = await fetch('https://inventory-api-personal.herokuapp.com/api/v1/products/category')
            const {categories} = await res.json()
            setCat(categories)
        }
        apiCall()
    }, [])


    return (
        <div className={sideBarToggle ?
            ' absolute top-0 left-0 w-2/3 lg:w-1/6 h-full overflow-scroll scroll-smooth bg-purple-100 border-r ease-in duration-700 z-50 '
            : 'absolute top-0 -left-full w-2/3 lg:w-1/6 bg-purple-100  border-r ease-in duration-700 z-50'}>
            <div className='flex flex-col gap-6 py-4 px-4'>
                <div className='text-xl font-bold w-full flex justify-between items-center'>
                    <p>Select Category</p>
                    <ImCross onClick={() => setSideBarToggle(false)} className='text-base font-semibold cursor-pointer' />
                </div>
                <div className='flex flex-col gap-3 text-gray-700 font-semibold text-lg'>
                    {
                        cat.map(el => {
                            return (
                                <Link to={`/category/${el.category}`} onClick={() => setSideBarToggle(false)} className='capitalize text-center border-b border-green-700 font-bold hover:text-green-800 py-2' key={el._id}>{el.category}</Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SideBar