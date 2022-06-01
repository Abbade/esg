import React, { createContext } from 'react';
import {IAuthContext} from '../interfaces/IAuthContext'

import useAuth from '../hooks/useAuth';


const Context = createContext({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const {
    authenticated, loading, handleLogin, handleLogout, handleResp,   abrirResp,  msgResp, tipoResp, handleCloseResp, handleLoginGoogle
  } = useAuth();

  return (
    <Context.Provider value={{ loading, authenticated, handleLogin, handleLogout,  handleResp,   abrirResp,  msgResp, tipoResp, handleCloseResp, handleLoginGoogle }}>
      {children}
    </Context.Provider>
  );
};



export { Context, AuthProvider };