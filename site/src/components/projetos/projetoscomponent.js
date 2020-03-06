import React, { useCallback, useState, useEffect } from 'react';

import ProjetoItem from './projetos-item';

import './projetoscomponent.css';
import { useHttpClient } from '../hooks/http-hooks';


const ProjetosComponent = props => {

    const [loadedProjetos, setProjetos] = useState(null);
    const { sendRequest, isLoading } = useHttpClient();

    const fetchProjetos = useCallback(async () => {

        setProjetos(null);
        try {
            const responseData = await sendRequest(
                'http://localhost:5000/api/projeto/getprojetos',
                'GET',
                null,
                {}
            )
            setProjetos(responseData.projetos);
        } catch (err) {

        }

    }, [sendRequest])

    useEffect(() => {
        fetchProjetos();
    }, [fetchProjetos])

    return (
        <div className="box-projetos">
            <p>Projetos pessoais:</p>
            <div className="box-projetos-item">
                {!isLoading && loadedProjetos && loadedProjetos.map(projeto =>
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
