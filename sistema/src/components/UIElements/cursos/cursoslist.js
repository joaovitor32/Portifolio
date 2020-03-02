import React from 'react';

import './cursoslist.css';
import Card from '../Card';
import CursoItem from '../cursos/cursoitem';

const CursoList = props =>{
    if(props.items.length===0){
        return (
            <div className="error-message">
                <Card>
                    <h2>Não há nenhum curso cadastrado</h2>
                </Card>
            </div>
        )
    }else{
        return (
            <section className="flex">
                {
                    props.items.map(curso=>
                        <CursoItem 
                            key={curso._id}
                            _id={curso._id}
                            nome={curso.nome}
                            descricao={curso.descricao}
                            imagem={curso.imagem}
                            reloadList={props.reloadList}
                        />    
                    )
                }
            </section>
        )
    }
}

export default CursoList;