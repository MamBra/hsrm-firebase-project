import React from 'react';
import { StyleSheet } from 'react-native';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import useAuthentication from './utils/hooks/useAuthentication';

import './config/firebase';

import LoadingPage from './screens/Loading';
import ResetPassword from './screens/ResetPassword';

export default function App() {

  const { user, loading: userLoading } = useAuthentication();
  // const location = React.useLocation(false);
  console.log(window.location)

  if (userLoading)
    return <LoadingPage />

  if (!user)
    if (window.location.pathname === '/register')
      return <Register/>
    else if(window.location.pathname === '/resetpassword')
      return <ResetPassword />
    else
      return <Login/>
  else
    return <Home/>
}
