import React, { useEffect,useState, useContext } from 'react';
import {useHttpClient} from '../components/hooks/http-hook';
import AuthContext from '../components/context/auth-context'

const Mensagem = props=>{
    
    const auth=useContext(AuthContext);
    const {sendRequest}=useHttpClient();
    const [loadedMessages,setLoadedMessages]=useState();

    useEffect(
        ()=>{
            const fetchMessages=async ()=>{
                try{
                    const responseData=await sendRequest(
                        'http://localhost:5000/api/messages/listamensagens'
                    ,
                    "GET",
                    null
                    ,{
                        "Content-Type": "application/json",
                        authorization:'Bearer '+auth.token
                          
                    })
                    setLoadedMessages(responseData);
                }catch(err){

                }
            }
            fetchMessages();
    },[sendRequest]);

    return (
        <h2>Mensagems</h2>
      
    )
}
 
export default Mensagem;