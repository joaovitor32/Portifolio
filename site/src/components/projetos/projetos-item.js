import React from 'react';

import './projetos-item.css';

import git from './icon/cat.svg';

const ProjetoItem = props => {

    return (
        <div className="card-projeto">
            <img className="imagem-projeto" src={`http://localhost:5000/${props.imagem}`} alt="projeto" />
            <div className="description-projeto">
                <h5>{props.nome}</h5>
                <hr className="hr-projeto" />
                <h5>{props.tecnologia}</h5>
                <a href={props.link}><img className="link-ico"  src={git} alt="github"/></a>
            </div>
        </div>
    )

}
export default ProjetoItem;