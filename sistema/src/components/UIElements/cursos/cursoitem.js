import React, { useContext, useState } from 'react';

import '../items/item.css';

import ErrorModal from '../modal/errormodal';
import Card from './../Card';


import Cross from './icons/cross.svg'
import Edit from './icons/edit.svg'
import Check from './icons/check.png'

import { useHttpClient } from '../../hooks/http-hook';
import AuthContext from '../../context/auth-context';

const CursoItem = props => {

    const { error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const [updateState, setUpdate] = useState(false);

    const initialState = {
        nome: "",
        descricao: "",

        nomeError: "",
        descricaoError: "",
    }

    const [state, setState] = useState({ ...initialState });

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {

        let isError = false;

        const errors = {
            nomeEror: "",
            descricaoError: "",
            imagemError: "",
        }

        if (state.nome.length === 0) {
            isError = true;
            errors.nomeError = "O nome não pode ser vazio";
        }
        if (state.descricao.length === 0) {
            isError = true;
            errors.descricaoError = "A descrição não pode ser vazia"
        }
        setState({
            ...state,
            ...errors
        })
        return isError;
    }

    const deleteHandler = async (id) => {
        try {
            await sendRequest(
                `http://localhost:5000/api/curso/${id}`,
                'DELETE',
                null,
                {
                    Authorization: `Bearer ${auth.token}`
                }
            )
        } catch (err) {

        }
        props.reloadList();
    }

    const resetForm = () => {
        document.getElementById('form').reset();
        setState({ ...initialState });
    }

    const changeUpdateState = () => {
        setUpdate(!updateState);
        if (updateState) {
            resetForm();
        }
    }

    const updateHandler = async event => {
        event.preventDefault();
        if (!validate()) {
            try {
                await sendRequest(
                    `http://localhost:5000/api/curso/${props._id}`,
                    'PATCH',
                    JSON.stringify({
                        'nome': state.nome,
                        'descricao': state.descricao
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }

                )  
                props.reloadList();
            } catch (err) {

            }
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card type="box">
                <div className="flexbox-item">
                    <div className="box-imagem">
                        <img className='img' src={`http://localhost:5000/${props.imagem}`} alt={props.nome} />
                    </div>
                    {!updateState && <div className="container-actions">
                        <div className="container-content">
                            <h4>{props.nome}</h4>
                            <p>{props.descricao}</p>
                        </div>
                        <img className="img-icon" onClick={() => deleteHandler(props._id)} src={Cross} alt="link-erase" />
                        <img className="img-icon" onClick={() => changeUpdateState()} src={Edit} alt="link-edit" />
                    </div>
                    }
                    {updateState && <div className="box-inputs">
                        <form id="form"  onSubmit={updateHandler}>
                            <div>
                                <label htmlFor="nome">Nome:</label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    onChange={handleChange}
                                />
                                <div className="box-error" >
                                    {state.nomeError}
                                </div>
                            </div>
                            <div>
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
                            <div className="container-actions">
                                <img className="img-icon" onClick={() => changeUpdateState()} src={Cross} alt="link-erase" />
                                <button type="submit"><img className="img-icon" src={Check} alt="link-confirm" /></button>
                            </div>
                        </form>
                    </div>
                    }
                </div>
            </Card>
        </React.Fragment>
    )

}

export default CursoItem;