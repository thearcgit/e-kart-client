import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signoutAsync } from '../authSlice'
import { Navigate } from 'react-router-dom'

const Signout = () => {
    const user = useSelector(state => state.auth.loggedInUser)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(signoutAsync())
    },[])
  return (
    <>
    {!user && <Navigate to="/login" replace={true}/>}
      
    </>
  )
}

export default Signout
