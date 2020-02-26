import React, { useContext } from 'react';

import './projetoitem.css';
import Github from './icons/github.svg'
import Cross from './icons/cross.svg'
import Edit from './icons/edit.svg'

import ErrorModal from '../../modal/errormodal'
import Card from './../Card'

import { useHttpClient } from '../../hooks/http-hook'
import AuthContext from '../../context/auth-context'

const ProjetoItem = props => {

    const { error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const deleteHandler = async (id) => {
        try {
            await sendRequest(
                `http://localhost:5000/api/projeto/${id}`,
                'DELETE',
                null,
                {
                    Authorization:'Bearer '+auth.token
                }
            );
        } catch (err) {

        }
        props.reloadList();
    }

    return (
        <React.Fragment  >
            <ErrorModal error={error} clearError={clearError} />
            <Card>
                <div key={props.key} className="flexbox-item">
                    <div className="box-imagem-projeto">
                        <img className="imgProjeto" src={`http://localhost:5000/${props.imagem}`} alt={props.nome} />
                    </div>
                    <hr />
                    <div className="container-content">
                        <h4>{props.nome}</h4>
                        <p>{props.tecnologia}</p>
                    </div>
                    <div className="container-actions">
                        <a href={props.link}><img className="img-icon" src={Github} alt="link-git" /></a>
                        <img className="img-icon" onClick={() => deleteHandler(props._id)} src={Cross} alt="link-erase" />
                        <img className="img-icon" src={Edit} alt="link-edit" />
                    </div>
                </div>
            </Card>
        </React.Fragment>
    )
};

export default ProjetoItem;