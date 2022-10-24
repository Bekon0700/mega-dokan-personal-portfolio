import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import MainFooter from '../main-footer/MainFooter'
import MainTop from '../main-top/MainTop'
import Loading from '../loading-overlay/Loading'

const Main = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])
  return (
    <div>
      {
        loading ?
        <Loading/>
        :
        <div>
            <MainTop />
              <Outlet />
            <MainFooter />
        </div>
      }
    </div>
  )
}

export default Main