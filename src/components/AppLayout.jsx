import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from '../ui/Loader';
import Navbar from './Navbar';

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      {isLoading && <Loader/>}
      <Navbar/>
      <Outlet />
    </>
  );
};

export default AppLayout;
