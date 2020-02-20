import {useState,useCallback,useRef,useEffect} from 'react';

export const useHttpClient=()=>{

    const [error,setError]=useState();

    const activeHttpRequest=useRec([]);

    const sendRequest=useCallback(
        async(url,method='GET',body=null,headers={})=>{
            const httpAbortCtrl= new AbortController();
            activeHttpRequest.current.push(httpAbortCtrl);
        
            try{
                const response=await fetch(url,{
                    method,
                    body,
                    headers,
                    signal:httpAbortCtrl.signal
                })  
                if(!response.ok){
                    throw new Error(responseData.error);
                }
            }catch(err){
                setError(err.message);
                throw err;
            }



        },[])
        
        const clearError=()=>{
            setError(null);
        }

        useEffect(()=>{
            return ()=>{
                activeHttpRequest.current.forEach(abortCtrl=>abortCtrl.abort());
            }
        },[])

    return {error,sendRequest,clearError}
}