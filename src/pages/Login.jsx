import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setUser, setLoading} from '../redux/reducers/authSlice'
import {loginAccount} from '../api/services/accountApi'
import {useMutation,useQueryClient} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [userData, setUserData] = useState({
    email:"",
    password:""
  });

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (userData) => loginAccount(userData),
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data) => {
      dispatch(
        setUser({
          currentUser: data.email,
          knownAs: data.knownAs,
          token: data.token,
          roles: data.roles
        })
      );
      if (data.roles.includes('Admin')) {
        navigate('/admin/dashboard', { replace: true }); // Navigate to Admin dashboard
      } else if (data.roles.includes('User')) {
        navigate('/user/dashboard', { replace: true }); // Navigate to User dashboard
      } else {
        navigate('/unauthorized', { replace: true });
      }
    },
    onError: (error) => {
      console.log(error.response?.data)
    },
    onSettled: () => {
      dispatch(setLoading(false));
    }

  })

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }))  
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(userData);
    console.log(userData);
  };

  return (
    <main className='flex items-center justify-center mt-2'>
      <form onSubmit={handleSubmit} className='bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            email
          </label>    
          <input 
            className='shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            type="text" onChange={handleInputChange} value={userData.email} name='email'/>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Password
          </label>
          <input 
            className='shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' 
            type="password" onChange={handleInputChange} value={userData.password} name='password'/>
        </div>
        
        <button
          className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
          type='submit'>Login</button>
      </form>
    </main>
  )
}

export default Login