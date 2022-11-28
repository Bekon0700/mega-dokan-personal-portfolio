import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import MainFooter from '../main-footer/MainFooter'
import MainTop from '../main-top/MainTop'
import Loading from '../loading-overlay/Loading'
import ScrollToTop from '../../scroll-to-top/ScrollToTop'

const Main = () => {

  return (
    <div>
      <ScrollToTop />
      <div className='sticky top-0'>
        <MainTop />
      </div>
      <Outlet />
      <MainFooter />
    </div>
  )
}

export default Main