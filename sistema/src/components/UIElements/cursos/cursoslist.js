import React from 'react';

import './cursoslist.css';
import Card from '../Card';
import CursoItem from '../cursos/cursoitem';

const CursoList = props => {
    if (props.items.length === 0) {
        return (
            <div className="error-message">
                <Card>
                    <h2>Não há nenhum curso cadastrado</h2>
                </Card>
            </div>
        )
    } else {
        return (
            <section className="flex">
                {
                    props.items.map(curso =>
                        <CursoItem
                            reloadList={props.reloadList}
                            key={curso._id}
                            _id={curso._id}
                            nome={curso.nome}
                            descricao={curso.descricao}
                            imagem={curso.imagem}
                        />
                    )
                }
            </section>
        )
    }
}

export default CursoList;