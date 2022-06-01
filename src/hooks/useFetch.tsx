import React from 'react';
import { Context } from '../context/AuthContext'

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState<string>('');
  const [loadingApi, setLoadingApi] = React.useState(false);
  const { handleLogout, handleResp } = React.useContext(Context);
 // const { loading, authenticated } = useContext(Context);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {

      setError('');
      setLoadingApi(true);
      response = await fetch(url, options);
      console.log(response);
      json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }

    } catch (e) {

      json = null;

      if(response?.status === 401){
        handleLogout();
      }
      console.log(e);
      let message = (e as Error).message;
      setError(message);
      if(message.length > 0){
        handleResp('error', message);
      }


    } finally {
      setData(json);
      setLoadingApi(false);
      return { response, json };
    }
  }, []);

  const get = React.useCallback(async (urlPath) => {
    let urlGet = process.env.REACT_APP_API_URL + urlPath;
    let options =  {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
       // Authorization: "Bearer " + token,
      },
    };
    return request(urlGet, options)
  }, [])

  const post = React.useCallback(async (urlPath : string, body) => {
    let urlGet = process.env.REACT_APP_API_URL + urlPath;
    let options =  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
       // Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
      
    };
    return request(urlGet, options)
  }, [])

  const put = React.useCallback(async (urlPath : string, body) => {
    let urlGet = process.env.REACT_APP_API_URL + urlPath;
    let options =  {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
       // Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
      
    };
    return request(urlGet, options)
  }, [])

  return {
    data,
    loadingApi,
    error,
    request,
    get,
    post,
    put
  };
};

export default useFetch;