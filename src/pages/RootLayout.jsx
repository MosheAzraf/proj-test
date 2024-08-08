import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCurrentUser } from '../hooks/useCurrentUser'

const RootLayout = () => {
    const {user, error, isLoading} = useCurrentUser();
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user);
        if(user && user.roles.includes('Admin')){
            return navigate('/admin')
        }

        


    },[isLoading,user,error])


  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default RootLayout