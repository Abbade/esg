
import React from 'react';
import {  Router } from 'react-router-dom';
import Response from './components/Response';
import { GoogleOAuthProvider } from '@react-oauth/google';


import { AuthProvider } from './context/AuthContext';
import Routes from './routesApp';



function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID === undefined ? '' : process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <Response />
      <Routes />
  </AuthProvider>
  </GoogleOAuthProvider>
  );
}

export default App;
