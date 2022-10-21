import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SideBar from '../side-bar/SideBar'
import {FiSearch} from 'react-icons/fi'
import { searchContext } from '../../context/SearchProvider'
import { cartContext } from '../../context/CartProvider'

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
    return (
        <div className='overflow-x-hidden'>
            <SideBar sideBarToggle={sideBarToggle} setSideBarToggle={setSideBarToggle} />
            <div className="py-4 px-4 bg-gray-700 text-purple-200 overflow-x-hidden">
                <div className='flex flex-col w-full gap-4'>
                <div className='flex justify-between items-center'>
                    <div className="flex-none">
                        <button className="btn btn-square btn-ghost" onClick={() => setSideBarToggle(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                    <div className="flex-1">
                        <Link to='/' className="btn btn-ghost btn-outline text-purple-200 normal-case text-lg font-semibold">Mega-Dokan</Link>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <Link to='/cart' className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{cart?.length ? cart.length : '0'}</span>
                            </Link>
                        </label>
                    </div>
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

{/* AVATAR */ }
{/* <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div> */}

export default NavBarMobile