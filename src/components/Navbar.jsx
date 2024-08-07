import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const navItems = [
    { path: '/', label: 'Home', roles: [] },
    { path: '/login', label: 'Login', roles: [] },
    { path: '/welcome', label: 'Welcome', roles: ['User', 'Admin'] }, // Shared route
    { path: '/user/dashboard', label: 'User Dashboard', roles: ['User'] }, // User-specific route
    { path: '/admin/manage-users', label: 'Manage Users', roles: ['Admin'] }, // Admin-specific route
  ];
  
const Navbar = () => {
    const { roles, currentUser } = useSelector((state) => state.auth);

    const filteredNavItems = navItems.filter((item) => {
        if (item.path === '/login' && currentUser) return false;
        return item.roles.length === 0 || item.roles.some((role) => roles.includes(role));
      });

    return (
    <nav className='flex items-center justify-center space-x-3'>
      {filteredNavItems.map((item, key) => (
        <NavLink key={key} to={item.path}>
          {item.label}
        </NavLink>
      ))}
    </nav>
    )
}

export default Navbar