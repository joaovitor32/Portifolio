import React, { useEffect, useState, useCallback } from 'react';

import { useHttpClient } from '../../components/hooks/http-hook';
import { useHistory } from 'react-router-dom'

import ErrorModal from '../../components/UIElements/modal/errormodal';
import ProjetosList from '../../components/UIElements/projetos/projetolist'
import LoadingSpinner from '../../components/UIElements/LoadingSpinner';

import '../button.css'

import Add from '../icons/plus.png'

const Portifolio = props => {

    const [loadedProjetos, setProjetos] = useState(null);

    const { error, sendRequest, clearError, isLoading } = useHttpClient();
    const history = useHistory();

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
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner className="center" />}
            {!isLoading && loadedProjetos && <ProjetosList reloadList={fetchProjetos} items={loadedProjetos} />}
            <div className="button-div">
                {!isLoading && <button type="button" onClick={() => history.push('/novoprojeto')} className="button-cad"><img src={Add} alt="novo projeto" /></button>}
            </div>
        </React.Fragment>
    )
}

export default Portifolio;