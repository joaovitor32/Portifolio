import React,{useState,useContext} from 'react';

import './NovoProjeto.css'

import {useHttpClient} from '../components/hooks/http-hook';
import AuthContext from '../components/context/auth-context';

import BoxForm from '../components/UIElements/BoxForm'


const NovoProjeto = props => {

    const [nome,setNome]=useState(null);
    const [tecnologia,setTecnologia]=useState(null);
    const [link,setLink]=useState(null);
    const [image,setImage]=useState(null);

    const {error,sendRequest} = useHttpClient();
    const auth=useContext(AuthContext);

    const createMessage = async event => {
        event.preventDefault();

        try{
            
            const formData= new FormData();
            formData.append('nome',nome);
            formData.append('tecnologia',tecnologia);
            formData.append('link',link);
            formData.append('image',image)

            const responseData=await sendRequest(
                'http://localhost:5000/api/projeto/createprojeto',
                'POST',
                formData,{
                    Authorization:'Bearer '+auth.token
                }
            )

        }catch(err){

        }

    }

    return (
        
        <BoxForm label="Novo projeto">
            <div className="div-form">
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome"/>
            </div>
            <div className="div-form">
                <label htmlFor="tecnologia">Tecnologias:</label>
                <input type="text" id="tecnologia" name="tecnologia"/>
            </div>
            <div className="div-form">
                <label htmlFor="nome">Github:</label>
                <input type="text" id="nome" name="nome"/>
            </div>
            <div className="div-form">
                <label htmlFor="nome">Imagem:</label>
                <input type="text" id="nome" name="nome"/>
            </div>
            <button className="btn-cad-projeto">Salvar</button>
        </BoxForm>
    )   
}

export default NovoProjeto;