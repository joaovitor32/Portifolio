import React  from 'react';

import ProjetoItem from './projetos-item';

import './projetoscomponent.css';

const ProjetosComponent = props => {

    return (
        <div className="box-projetos">
            <div className="box-p">
                <p>Projetos pessoais:</p>
            </div>
            <div className="box-projetos-item">
                {props.projetos.map(projeto =>
                    <ProjetoItem
                        key={projeto._id}
                        nome={projeto.nome}
                        tecnologia={projeto.tecnologia}
                        link={projeto.link}
                        imagem={projeto.imagem}
                    />
                )}
            </div>
        </div>
    )
}

export default ProjetosComponent;
