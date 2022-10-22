import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {authContext} from './../context/AuthProvider'
const ProtectedRoute = ({children}) => {
    const {user, isLoading} = useContext(authContext)
    const location = useLocation()
    console.log(location)
  if(isLoading){
    return(
      <div>
        Loading....
      </div>
    )
  }

  if(user && user.uid){
    return (
      <div>
          {children}
      </div>
    )
  }else{
    return <Navigate to='/login' replace={true} state={{from: `${location.pathname}`, to:'/login'}} />
  }
}

export default ProtectedRoute