import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector,} from "react-redux"
import { setLoading,setUser} from './redux/reducers/authSlice'
import Loader from "./ui/Loader"
import { getCurrentUser } from "./api/services/accountApi"
import router from './routes/router'

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: !!token,
    retry: 1,
  });

  useEffect(() => {
    if (!token) {
      setInitialCheckDone(true);
      return;
    }

    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }

    if (user) {
      dispatch(setUser({ currentUser: user.email, token:user.token, roles: user.roles }));
      setInitialCheckDone(true);
      if (user.roles.includes('Admin')) {
        navigate('/admin/dashboard');
      } else if (user.roles.includes('User')) {
        navigate('/user/dashboard');
      } else {
        navigate('/unauthorized');
      }
    } else if (error) {
      setInitialCheckDone(true);
    }
  }, [isLoading, error, user, dispatch, navigate, token]);

  if (authLoading || !initialCheckDone) {
    return <Loader />;
  }

  return (
    <RouterProvider router={router}/>
  );
}

export default App
