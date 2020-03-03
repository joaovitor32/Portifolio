import React, { useContext, useState } from 'react';

import '../items/item.css'

import Github from './icons/github.svg'
import Cross from './icons/cross.svg'
import Edit from './icons/edit.svg'
import Check from './icons/check.png'

import ErrorModal from '../modal/errormodal'
import Card from './../Card'

import { useHttpClient } from '../../hooks/http-hook'
import AuthContext from '../../context/auth-context'

const ProjetoItem = props => {

    const { error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const [updateState, setUpdate] = useState(false);

    const initialState = {
        nome: "",
        tecnologia: "",
        link: "",

        nomeError: "",
        tecnologiaError: "",
        linkError: "",
    }

    const [state, setState] = useState({ ...initialState })

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let isError = false;
        const errors = {
            nomeError: "",
            linkError: "",
            tecnologiaError: "",
        }

        if (state.nome.length === 0) {
            isError = true;
            errors.nomeError = "O nome não pode ser vazio";
        }
        if (state.tecnologia.length === 0) {
            isError = true;
            errors.tecnologiaError = "Deve haver pelo menos uma tecnologia";
        }
        if (state.link.length === 0) {
            isError = true;
            errors.linkError = "Deve haver um link";
        }
        setState({
            ...state,
            ...errors
        })
        return isError;
    }

    /*const resetForm = () => {
        document.getElementById('form').reset();
        setState({ ...initialState });
    }*/

    const updateHandler = async event => {
        event.preventDefault();
        if (!validate()) {
            try {
                await sendRequest(
                    `http://localhost:5000/api/projeto/${props._id}`,
                    'PATCH',
                    JSON.stringify({
                        'nome': state.nome,
                        'link': state.link,
                        'tecnologia': state.tecnologia
                    }), {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                )
                props.reloadList();
            } catch (err) {
 
            }
        }
    }

    const deleteHandler = async (id) => {
        try {
            await sendRequest(
                `http://localhost:5000/api/projeto/${id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
        } catch (err) {

        }
        props.reloadList();
    }

    const changeUpdateState = async () => {
        setUpdate(!updateState);
    }

    return (
        <React.Fragment  >
            <ErrorModal error={error} clearError={clearError} />
            <Card type="box">
                <div className="flexbox-item">
                    <div className="box-imagem">
                        <img className="img" src={`http://localhost:5000/${props.imagem}`} alt={props.nome} />
                    </div>
                    <hr />
                    {updateState &&
                        <div className="box-inputs">
                            <form id="form" onSubmit={updateHandler} >
                                <div>
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
                                <div>
                                    <label htmlFor="tecnologia">Tecnologia:</label>
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
                                <div>
                                    <label htmlFor="link">Link:</label>
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
                                <div className="container-actions">
                                    <img className="img-icon" onClick={() => changeUpdateState()} src={Cross} alt="link-erase" />
                                    <button type="submit"><img className="img-icon" src={Check} alt="link-confirm" /></button>
                                </div>
                            </form>
                        </div>
                    }
                    {!updateState && <div className="container-actions">
                        <div className="container-content">
                            <h4>{props.nome}</h4>
                            <p>{props.tecnologia}</p>
                        </div>
                        <a href={props.link}><img className="img-icon" src={Github} alt="link-git" /></a>
                        <img className="img-icon" onClick={() => deleteHandler(props._id)} src={Cross} alt="link-erase" />
                        <img className="img-icon" onClick={() => changeUpdateState()} src={Edit} alt="link-edit" />
                    </div>}
                </div>
            </Card>
        </React.Fragment>
    )
};

export default ProjetoItem;