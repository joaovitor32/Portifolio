import React, { useState, useEffect, useCallback } from 'react';

import './curso.css';
import { useHttpClient } from '../../hooks/http-hooks'

import CursoItem from './curso-item';

const Cursos = props => {

    const [loadedCursos, setCursos] = useState(null);
    const { sendRequest,isLoading } = useHttpClient();

    const fetchCursos = useCallback(async () => {
        setCursos(null);
        try {
            const responseData = await sendRequest(
                'http://localhost:5000/api/curso/getcursos',
                'GET',
                null,
                {}
            )
            setCursos(responseData.cursos);
        } catch (err) {

        }
    }, [sendRequest])

    useEffect(() => {
        fetchCursos();
    }, [fetchCursos])

    return (
        <div className="box-cursos">
            <p>Cursos que fiz:</p>
            <div className="box-cursos-item">
                {!isLoading && loadedCursos && loadedCursos.map(curso =>
                    <CursoItem
                        key={curso._id}
                        nome={curso.nome}
                        descricao={curso.descricao}
                        imagem={curso.imagem}
                    />
                )}
            </div>
        </div>
    )
}

export default Cursos;