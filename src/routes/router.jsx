import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/AppLayout'
import ProtectedRoute from "../components/ProtectedRoute"
import Error from '../pages/Error'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ManageUsers from '../pages/ManageUsers'
import Unauthorized from '../pages/Unauthorized'
import User from '../pages/User'
import Welcome from '../pages/Welcome'
import AdminDashboard from '../pages/AdminDashboard'

const router = createBrowserRouter([
    {
      element:<AppLayout/>,
      errorElement:<Error/>,
  
      children: [
        { path: '/', element: <Home/> },
        { path: '/login',element: <Login/>},
        //shared routes
        {
          path:'/',
          element: <ProtectedRoute allowedRoles={['User','Admin']}/>,
          children:[
              { path: 'welcome', element: <Welcome/> },
          ]
        },
        //user routes
        {
          path:'/user',
          element: <ProtectedRoute allowedRoles={['User']}/>,
          children:[
            {path:'dashboard', element:<User/>}
          ]
        },
        //admin routes
        {
          path:'/admin',
          element: <ProtectedRoute allowedRoles={['Admin']}/>,
          children:[
            {path:'dashboard', element:<AdminDashboard/>},
            {path:'manage-users', element:<ManageUsers/>}
          ]
        },
        {
          path:'/unauthorized',
          element: <Unauthorized/>
        }
      ]
    }
  ])

export default router;