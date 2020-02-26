import React from 'react';

import './projetolist.css';
import Card from '../Card';

import ProjetoItem from './projetoitem';

const ProjetosList = props => {
    if (props.items.length === 0) {
        return (
            <div className="error-message">
                <Card>
                    <h2>Não há nenhuma mensagem cadastrada.</h2>
                </Card>
            </div>
        )
    } else {
        return (
            <section className="flex">
                {
                    props.items.map(projeto =>
                        <ProjetoItem
                            key={props._id}
                            nome={projeto.nome}
                            link={projeto.link}
                            tecnologia={projeto.tecnologia}
                            imagem={projeto.imagem}
                        />
                    )}
            </section>
        )
    }
};

export default ProjetosList;