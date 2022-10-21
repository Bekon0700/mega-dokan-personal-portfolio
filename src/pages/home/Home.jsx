import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import MegaDeal from '../../components/mega-deal/MegaDeal'

const Home = () => {
    const data = useLoaderData()
  return (
    <div className='w-5/6 mx-auto pb-8'>
        <MegaDeal data={data} />
        <div className='flex items-center bg-orange-300 justify-center py-4 gap-4'>
          <p className='text-base lg:text-2xl font-semibold'>Find All our products </p>
          <Link to={'/all-products'} className="btn glass text-gray-700 text-base lg:text-2xl font-semibold">Here</Link>
        </div>
    </div>
  )
}

export default Home