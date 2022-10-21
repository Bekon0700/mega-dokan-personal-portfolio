import React from 'react'
import NavBarDesktop from '../../nav-bar/NavBarMobile'
import NavBarMobile from '../../nav-bar/NavBarDesktop'

const MainTop = () => {
  return (
    <div>
      <div className='block lg:hidden'>
        <NavBarDesktop />
      </div>
      <div className='hidden lg:block'>
        <NavBarMobile />
      </div>
    </div>
  )
}

export default MainTop