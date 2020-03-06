import React, { useState, useEffect } from 'react';

import './projetos.css';

import ProjetosComponent from '../../components/projetos/projetoscomponent';
import Footer from '../../components/footer/footer';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const Projetos = props => {

    const [load, setLoad] = useState(true);

    useEffect(() => {
        setLoad(false);
    }, [setLoad])

    return (

        <React.Fragment>
            {load && <LoadingSpinner />}
            {!load &&
                <React.Fragment>
                    <ProjetosComponent />
                    <Footer />
                </React.Fragment>
            }
        </React.Fragment>

    )
}

export default Projetos;