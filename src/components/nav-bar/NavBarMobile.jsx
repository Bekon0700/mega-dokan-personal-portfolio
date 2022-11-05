import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SideBar from '../side-bar/SideBar'
import {FiSearch} from 'react-icons/fi'
import { searchContext } from '../../context/SearchProvider'
import { cartContext } from '../../context/CartProvider'
import { authContext } from '../../context/AuthProvider'

const NavBarMobile = () => {
    const [sideBarToggle, setSideBarToggle] = useState(false)
    const navigate = useNavigate()
    const {searchHandler} = useContext(searchContext)
    const submitHandle = (e) => {
        e.preventDefault()
        const searchKey = e.target.search.value
        searchHandler(searchKey)
        navigate(`/search/${searchKey}`)
        e.target.reset()
    }
    const {cart} = useContext(cartContext)
    const {userLogout, user} = useContext(authContext)

    const logOutHandler = async () => {
        await userLogout()
    }
    return (
        <div className='overflow-x-hidden'>
            <SideBar sideBarToggle={sideBarToggle} setSideBarToggle={setSideBarToggle} />
            <div className="py-4 px-2 bg-gray-700 text-purple-200 overflow-x-hidden">
                <div className='flex flex-col w-full gap-4'>
                <div className='flex justify-between items-center'>
                    <div className="flex-none">
                        <button className="btn btn-square btn-ghost" onClick={() => setSideBarToggle(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                    <div className="flex-1">
                        <Link to='/' className="text-purple-200 normal-case text-base lg:text-lg font-semibold">Mega-<span className='text-orange-300'>Dokan</span></Link>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <Link to='/cart' className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{cart?.length ? cart.length : '0'}</span>
                            </Link>
                        </label>
                    </div>
                    {
                        user?.displayName ?
                        <div className='flex gap-2 items-center'>
                            <p className='text-base font-semibold text-green-300 capitalize'>{user.displayName}</p>
                            <Link onClick={logOutHandler} className='p-1 border text-sm border-white rounded-lg'>Log out</Link>
                        </div>
                        :
                        <Link to='/login' state={{from: `${location.pathname}`}} className='p-1 text-sm border border-white rounded-lg'>Sign in</Link>
                    }
                </div>
                
                <div className="flex-none gap-2">
                    <form onSubmit={submitHandle} className="flex items-center">
                        <input type="text" placeholder="Search product" name='search' className="py-1 px-2 outline-none rounded-l-md text-amber-900 font-semibold w-full" />
                        <button className='bg-gray-500 text-2xl text-white font-semibold py-1 px-2 rounded-r-md'><FiSearch /></button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default NavBarMobile