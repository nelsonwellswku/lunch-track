import React, { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import { Redirect } from 'react-router';

const SignOut = () => {
  const { logout } = useContext(AppContext);
  logout();
  return <Redirect to='/' />
};

export default SignOut;
