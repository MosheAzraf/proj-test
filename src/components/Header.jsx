import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex items-center justify-center space-x-3'>
       <Link to='/'>Home</Link>
       <Link to='/login'>Login</Link>     
    </header>
  )
}

export default Header