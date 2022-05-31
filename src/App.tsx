
import React from 'react';
import {  Router } from 'react-router-dom';
import Response from './components/Response';


import { AuthProvider } from './context/AuthContext';
import Routes from './routesApp';



function App() {
  return (
    <AuthProvider>
      <Response />
      <Routes />
  </AuthProvider>
  );
}

export default App;
