import React, { useState, useContext } from 'react';

import './form.css'

import { useHttpClient } from '../components/hooks/http-hook';
import AuthContext from '../components/context/auth-context';

import BoxForm from '../components/UIElements/BoxForm'
import ErrorModal from '../components/UIElements/modal/errormodal'

const NovoProjeto = props => {

    const { error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const initialState={
        nome: "",
        tecnologia: "",
        link: "",
        imagem: "",

        nomeError: "",
        tecnologiaError: "",
        linkError: "",
        imagemError: "",

    }

    const [state, setState] = useState({...initialState})

    const handleChange = e => {
        const value = e.target.type === "text" ? e.target.value : e.target.files[0];
        setState({
            ...state,
            [e.target.name]: value,
        })
    }

    const validate = () => {
        let isError = false;
        const errors = {
            nomeError: "",
            tecnologiaError: "",
            linkError: "",
            imagemError: "",
        };

        if (state.nome.length === 0) {
            isError = true;
            errors.nomeError = "O nome não pode ser vazio";
        }
        if (state.link.length === 0) {
            isError = true;
            errors.linkError = "O link não pode ser vazio";
        }
        if (state.tecnologia.length === 0) {
            isError = true;
            errors.tecnologiaError = "Deve ter pelo menos uma tecnologia";
        }
        if (!state.imagem) {
            isError = true;
            errors.imagemError = "Arquivo inválido";
        }
        setState({
            ...state,
            ...errors
        });
        return isError;
    }

    const resetForm = ()=>{
        document.getElementById("form").reset();
        setState({...initialState});
    }

     const createMessage = async event => {
        event.preventDefault();
        if (!validate()) {
            try {
                const formData = new FormData();
                formData.append('nome', state.nome);
                formData.append('tecnologia', state.tecnologia);
                formData.append('link', state.link);
                formData.append('image', state.imagem)

                await sendRequest(
                        'http://localhost:5000/api/projeto/cadastrarprojeto',
                        'POST',
                        formData, {
                        Authorization: 'Bearer ' + auth.token
                    }
                )
                resetForm();
            } catch (err) {

            }
        }
        console.log(state);
    }



    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <BoxForm  label="Novo projeto">
                <form id="form" encType="multipart/form-data" onSubmit={createMessage} >
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
                        <label htmlFor="tecnologia">Tecnologias:</label>
                        <input
                            type="text"
                            id="tecnologia"
                            name="tecnologia"
                            onChange={handleChange}
                        />
                        <div className="box-error">
                            {state.tecnologiaError}
                        </div>
                    </div>
                    <div className="div-form">
                        <label htmlFor="link">Github:</label>
                        <input
                            type="text"
                            id="link"
                            name="link"
                            onChange={handleChange}
                        />
                        <div className="box-error">
                            {state.linkError}
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
                    <button className="btn-cad">Salvar</button>
                </form>
            </BoxForm>
        </React.Fragment>
    )
}
export default NovoProjeto;