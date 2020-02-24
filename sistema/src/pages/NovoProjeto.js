import React,{useState,useContext} from 'react';

import './NovoProjeto.css'

import {useHttpClient} from '../components/hooks/http-hook';
import AuthContext from '../components/context/auth-context';

import BoxForm from '../components/UIElements/BoxForm'
import ErrorModal from '../components/modal/errormodal'

const NovoProjeto = props => {

    const [nome,setNome]=useState(null);
    const [tecnologia,setTecnologia]=useState(null);
    const [link,setLink]=useState(null);
    const [image,setImage]=useState(null);

    const {error,sendRequest,clearError} = useHttpClient();
    const auth=useContext(AuthContext);

    const createMessage = async event => {
        event.preventDefault();
        try{
            const formData= new FormData();
            formData.append('nome',nome);
            formData.append('tecnologia',tecnologia);
            formData.append('link',link);
            formData.append('image',image)

            await sendRequest(
                'http://localhost:5000/api/projeto/cadastrarprojeto',
                'POST',
                formData,{
                    Authorization:'Bearer '+auth.token
                }
            )
            
        }catch(err){

        }

    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <BoxForm label="Novo projeto">
                <form encType="multipart/form-data" onSubmit={createMessage} >
                    <div className="div-form">
                        <label htmlFor="nome">Nome:</label>
                        <input 
                            type="text"
                            id="nome" 
                            name="nome"
                            onChange={e=>setNome(e.target.value)}
                        />
                    </div>
                    <div className="div-form">
                        <label htmlFor="tecnologia">Tecnologias:</label>
                        <input 
                            type="text" 
                            id="tecnologia" 
                            name="tecnologia"
                            onChange={e=>setTecnologia(e.target.value)}
                        />
                    </div>
                    <div className="div-form">
                        <label htmlFor="link">Github:</label>
                        <input 
                            type="text" 
                            id="link" 
                            name="link"
                            onChange={e=>setLink(e.target.value)}
                        />
                    </div>
                    <div className="div-form">
                        <label htmlFor="imagem">Imagem:</label>
                        <input 
                            type="file" 
                            id="imagem" 
                            name="imagem"
                            onChange={e=>setImage(e.target.files[0])}
                        />
                    </div>
                    <button className="btn-cad-projeto">Salvar</button>
                </form>
            </BoxForm>
        </React.Fragment> 
    )   
}

export default NovoProjeto;