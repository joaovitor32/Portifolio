import React from 'react';

import './projetoitem.css';
import Github from './icons/github.svg'
import Cross from './icons/cross.svg' 
import Edit from './icons/edit.svg'

const ProjetoItem = props => {
    return (
        <React.Fragment  >
            <div key={props.key} className="flexbox-item card">
                <div className="box-imagem-projeto">
                    <img className="imgProjeto" src={`http://localhost:5000/${props.imagem}`} alt={props.nome} />
                </div>
                <hr/>
                <div className="container-content">
                    <h4>{props.nome}</h4>
                    <p>{props.tecnologia}</p>
                </div>
                <div className="container-actions">
                    <a href={props.link}><img className="img-icon" src={Github} alt="link-git"/></a>
                    <img className="img-icon" src={Cross} alt="link-erase"/>
                    <img className="img-icon" src={Edit} alt="link-edit"/>
                </div>
            </div>
        </React.Fragment>
    )
};

export default ProjetoItem;