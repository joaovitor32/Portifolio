import React from 'react';

import './curso-item.css';


const CursoItem = props => {
    return (
        <div className="card-curso">
            <img className="imagem-curso" src={`http://localhost:5000/${props.imagem}`} alt="curso-logo" />
            <div className="description-curso">
                <h5>{props.nome}</h5>
                <hr />
                <h5>{props.descricao}</h5>
            </div>
        </div>
    )
}

export default CursoItem;