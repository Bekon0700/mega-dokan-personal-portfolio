import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Marquee from "react-fast-marquee";
import { Link, useLoaderData } from 'react-router-dom'
import Loading from '../../components/layout/loading-overlay/Loading'
import MegaDeal from '../../components/mega-deal/MegaDeal'
import HomeSlider from '../../components/slider/HomeSlider'

const Home = () => {
  const { data: topData = [], isLoading } = useQuery({
    queryKey: ['top-10-product'],
    queryFn: async () => {
      const res = await axios.get('https://inventory-rest-api.vercel.app/api/v1/products/top-10-deals')
      return res.data
    }
  })

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <div className='pb-8'>
      <HomeSlider />
      <div className='w-11/12 lg:w-3/4 mx-auto'>
        <Marquee speed={40} gradientWidth={0} className='text-gray-900 font-medium -z-20'>
          Black friday offer! Get 20% discount on all laptop products
        </Marquee>
        <MegaDeal data={topData} />
        <div className='flex items-center bg-orange-300 justify-center py-2 gap-4'>
          <Link to={'/all-products'} className="text-gray-700 text-base lg:text-xl font-semibold">Find All our products Here</Link>
        </div>
      </div>
    </div>
  )
}

export default Home