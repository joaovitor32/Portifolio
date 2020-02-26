import React, { useEffect, useState, useContext, useCallback } from 'react';

import { useHttpClient } from '../components/hooks/http-hook';
import AuthContext from '../components/context/auth-context';
import { useHistory } from 'react-router-dom'

import ErrorModal from '../components/modal/errormodal';
import ProjetosList from '../components/UIElements/projetos/projetolist'
import LoadingSpinner from '../components/UIElements/LoadingSpinner';

import './portifolio.css'

import Add from './icons/plus.png'

const Portifolio = props => {

    const [loadedProjetos, setProjetos] = useState(null);

    const { error, sendRequest, clearError, isLoading } = useHttpClient();
    const auth = useContext(AuthContext);
    const history = useHistory();

    const fetchProjetos = useCallback(async () => {
        setProjetos(null);
        try {
            const responseData = await sendRequest(
                'http://localhost:5000/api/projeto/getprojetos',
                'GET',
                null,
                {
                    Authorization: `Bearer ${auth.token}`
                }
            )
            setProjetos(responseData.projetos);
        } catch (err) {

        }
    }, [auth, sendRequest])

    useEffect(() => {
        fetchProjetos();
    }, [fetchProjetos])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner className="center"/>}
            {!isLoading && loadedProjetos && <ProjetosList reloadList={fetchProjetos} items={loadedProjetos} />}
            {!isLoading&&<button onClick={() => history.push('/novoprojeto')} className="button-cad-projeto"><img src={Add} alt="novo projeto" /></button>}

        </React.Fragment>
    )
}

export default Portifolio;