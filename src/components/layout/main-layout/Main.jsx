import React from 'react'
import { Outlet } from 'react-router-dom'
import MainFooter from '../main-footer/MainFooter'
import MainTop from '../main-top/MainTop'

const Main = () => {
  return (
    <div>
        <MainTop />
          <Outlet />
        <MainFooter />
    </div>
  )
}

export default Main