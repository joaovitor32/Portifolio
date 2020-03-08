import React , { useCallback, useState, useEffect } from'react';

import {useHttpClient} from '../../components/hooks/http-hooks'

import './projetos.css';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ProjetosComponent from '../../components/projetos/projetoscomponent';
import Footer from '../../components/footer/footer';

const Projetos = props => {

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

        <React.Fragment>
            <React.Fragment>
                {isLoading && <LoadingSpinner/>}
                {!isLoading && loadedProjetos&&<ProjetosComponent projetos={loadedProjetos} />}
                {!isLoading&&<Footer />}
            </React.Fragment>
        </React.Fragment>

    )
}

export default Projetos;