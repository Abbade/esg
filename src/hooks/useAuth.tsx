import { useState, useEffect } from 'react';
import useFetch from './useFetch'
import {  AlertColor } from '@mui/material/Alert';




export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [abrirResp, setAbrirResp] = useState(false);
  const [msgResp, setMsgResp] = useState('');
  const [tipoResp, setTipoResp] = useState<AlertColor>('success');
  const {  error, post } = useFetch();



  useEffect(() => {  
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, [authenticated]);
  
  async function handleLogin(email : string, password : string) {
    try {
      let url = '/user/login';
      let body = {
        email : email,
        passwordSystem: password
      };
      const { response, json  } = await post(url, body); 

      if(response !== undefined && response.ok){
     
        if(json.success){     
          localStorage.setItem('token', json.token);
          setAuthenticated(true);
          return true;
        }
        else{
          setAuthenticated(false);
          localStorage.removeItem('token');
          return false;
        }  
      }
      else{
        if(error !== undefined && error.length > 0){
          handleResp('error', error)
        }
        setAuthenticated(false);  
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      throw(error);
    }
   
    
  }

  function handleLogout() {
    try {
     // setAuthenticated(false);
      localStorage.removeItem('token'); 
      window.location.href = "/login"  
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
    

  }

  function handleResp(tipoResp : AlertColor, msg : string ){
    setMsgResp(msg);
    setTipoResp(tipoResp);
    setAbrirResp(true);
  }
  function handleCloseResp(){
    setAbrirResp(false);
  }


  
  return { authenticated, loading, handleLogin, handleLogout, handleResp,   abrirResp,  msgResp, tipoResp, handleCloseResp  };
}