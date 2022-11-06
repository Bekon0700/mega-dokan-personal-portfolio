import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import MegaDeal from '../../components/mega-deal/MegaDeal'

const Home = () => {
    const data = useLoaderData()
  return (
    <div className='w-11/12 lg:w-4/5 mx-auto pb-8'>
        <MegaDeal data={data} />
        <div className='flex items-center bg-orange-300 justify-center py-2 gap-4'>
          <Link to={'/all-products'} className="text-gray-700 text-base lg:text-xl font-semibold">Find All our products Here</Link>
        </div>
    </div>
  )
}

export default Home