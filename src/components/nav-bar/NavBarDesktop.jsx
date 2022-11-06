import React, { useContext, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/AuthProvider'
import { cartContext } from '../../context/CartProvider'
import { searchContext } from '../../context/SearchProvider'
import SideBar from '../side-bar/SideBar'

const NavBarDesktop = () => {
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
        <div className=''>
            <div>
            <SideBar sideBarToggle={sideBarToggle} setSideBarToggle={setSideBarToggle} />
            </div>
            <div className="navbar  bg-gray-700 text-purple-200 pr-8">
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost" onClick={() => setSideBarToggle(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
                <div className="flex-1">
                    <Link to='/' className="btn btn-ghost btn-outline text-purple-200 normal-case text-xl font-bold">Mega-Dokan</Link>
                </div>
                <div className="flex-none gap-2">
                    <form onSubmit={submitHandle} className="flex items-center">
                        <input type="text" placeholder="Search product" name='search' className="py-1 px-2 outline-none rounded-l-md text-amber-900 font-semibold w-full" />
                        <button className='bg-gray-500 text-2xl text-white font-semibold py-1 px-2 rounded-r-md'><FiSearch /></button>
                    </form>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <Link to='/cart' className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{cart?.length ? cart.length : '0'}</span>
                            </Link>
                        </label>
                    </div>
                    {/* AVATAR */}
                    {
                        user?.displayName ?
                        <div className='flex gap-4 items-center'>
                            <p className='text-xl font-semibold text-green-300 capitalize'>welcome, {user.displayName}</p>
                            <Link onClick={logOutHandler} className='p-2 border border-white rounded-lg'>Log out</Link>
                        </div>
                        :
                        <Link to='/login' state={{from: `${location.pathname}`}} className='p-2 border border-white rounded-lg'>Sign in</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBarDesktop