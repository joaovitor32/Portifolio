import React, { useContext, useState } from 'react';
import './NovoCurso.css';

import { useHttpClient } from '../../components/hooks/http-hook';
import AuthContext from '../../components/context/auth-context';

import ErrorModal from '../../components/UIElements/modal/errormodal';
import BoxForm from '../../components/UIElements/BoxForm';

import '../form.css'

const NovoCurso = props => {

    const { error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const initialState = {
        nome: "",
        descricao: "",
        imagem: "",

        nomeError: "",
        descricaoError: "",
        imagemError: "",
    }

    const [state, setState] = useState({ ...initialState });

    const handleChange = e => {
        const value = e.target.type === 'text' ? e.target.value : e.target.files[0];
        setState({
            ...state,
            [e.target.name]: value
        })
    }

    const validate = () => {
        let isError = false;
        const errors = {
            nomeError: "",
            descricaoError: "",
            imagemError: ""
        }

        if (state.nome.length === 0) {
            isError = true;
            errors.nomeError = "O nome não pode ser vazio";
        }
        if (state.descricao.length === 0) {
            isError = true;
            errors.descricaoError = "A descrição não pode ser vazia"
        }
        if (!state.imagem) {
            isError = true;
            errors.imagemError = "Imagem não pode ser vazia";
        }
        setState({
            ...state,
            ...errors
        })
        return isError;
    }

    const resetForm = ()=>{
        document.getElementById("form").reset();
        setState({...initialState});
    }

    const createCurso = async e => {
        e.preventDefault();
        if(!validate()){
            try{    

                const formData=new FormData();
                formData.append('nome', state.nome);
                formData.append('descricao', state.descricao);
                formData.append('imagem', state.imagem)
              

                await sendRequest(
                    'http://localhost:5000/api/curso/createcurso',
                    'POST',
                    formData,
                    {
                        Authorization: 'Bearer ' + auth.token 
                    }
                )
                resetForm();
            }catch(err){

            }
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <BoxForm label="Novo curso">
                <form id="form" encType="multipart/form-data" onSubmit={createCurso}>
                    <div className="div-form">
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            onChange={handleChange}
                        />
                        <div className="box-error">
                            {state.nomeError}
                        </div>
                    </div>
                    <div className="div-form">
                        <label htmlFor="descricao">Descrição:</label>
                        <input
                            type="text"
                            id="descricao"
                            name="descricao"
                            onChange={handleChange}
                        />
                        <div className="box-error">
                            {state.descricaoError}
                        </div>
                    </div>
                    <div className="div-form">
                        <label htmlFor="imagem">Imagem:</label>
                        <input
                            type="file"
                            id="imagem"
                            name="imagem"
                            onChange={handleChange}
                        />
                        <div className="box-error">
                            {state.imagemError}
                        </div>
                    </div>
                    <button type="submit" className="btn-cad">Salvar</button>
                </form>
            </BoxForm>
        </React.Fragment>
    )
}

export default NovoCurso;