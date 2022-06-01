import React from 'react';
import { IFeedback } from '../interfaces/IFeedback';
import { IFeedbackList } from '../interfaces/IFeedbackList';
import { IItem } from '../interfaces/IItem';
import useFetch from './useFetch';

const useEsg = () => {

  const { get, post, getAuth } = useFetch();

  const getTypes = async () => {
    let url = '/esg'
    const { response, json  } = await get(url); 
    if(response !== undefined && response.ok){
        return json as IItem[];
    } 
    else{
        return [] as IItem[];
    }
  }

  const getSubjects = async (esgId : number) => {
    let url = `/esg/subjects?esg=${esgId}`;
    const { response, json  } = await get(url); 
    if(response !== undefined && response.ok){
        return json as IItem[];
    } 
    else{
        return [] as IItem[];
    }
  }

  const getFeedbacks = async () => {
    let url = `/esg/Feedback`;
    const { response, json  } = await getAuth(url); 
    if(response !== undefined && response.ok){
        return json as IFeedbackList[];
    } 
    else{
        return [] as IFeedbackList[];
    }
  }

  const createFeedback = async (feedback : IFeedback) => {
    let url = `/esg/feedback`;
    const { response, json  } = await post(url, feedback); 
    if(response !== undefined && response.ok){
        return json as IItem[];
    } 
    else{
        return [] as IItem[];
    }
  }

  return {
    getTypes,
    getSubjects,
    createFeedback,
    getFeedbacks
  };
};

export default useEsg;