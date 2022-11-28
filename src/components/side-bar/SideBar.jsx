import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars'

import { ImCross } from 'react-icons/im'
import { Link } from 'react-router-dom'

const SideBar = ({ sideBarToggle, setSideBarToggle }) => {
    const { data: cat = [], isLoading } = useQuery({
        queryKey: ['side-bar'],
        queryFn: async () => {
            const res = await axios.get('https://inventory-rest-api.vercel.app/api/v1/products/category')
            return res.data.categories
        }
    })

    return (
        <div className={sideBarToggle ?
            ' absolute top-0 left-0 w-2/3 lg:w-1/6 h-screen  bg-purple-100 border-r ease-in duration-700 z-50 '
            : 'absolute top-0 -left-full w-2/3 lg:w-1/6 bg-purple-100  border-r ease-in duration-700 z-50'}>
            <Scrollbars style={{ width: '100%', height: '100%' }} autoHide >
                <div className='flex flex-col gap-6 py-4 px-4'>
                    <div className='text-xl font-bold w-full flex justify-between items-center'>
                        <p>Select Category</p>
                        <ImCross onClick={() => setSideBarToggle(false)} className='text-base font-semibold cursor-pointer' />
                    </div>
                    <div className='w-full flex flex-col gap-3 text-gray-700 font-semibold text-base'>
                        {
                            cat.map(el => {
                                return (
                                    <Link to={`/category/${el.category}`} onClick={() => setSideBarToggle(false)} className='capitalize text-center border-b border-green-700 font-medium hover:text-green-800 py-2' key={el._id}>{el.category}</Link>
                                )
                            })
                        }
                    </div>
                </div>
            </Scrollbars>
        </div>
    )
}

export default SideBar