import React, { useState, useEffect } from 'react';

import Perfil from '../../components/home/perfil'
import Descricao from '../../components/home/descricao';
import Cursos from '../../components/home/cursos/curso';
import Footer from '../../components/footer/footer';

import './Home.css'

const Home = props => {

    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true);
    }, [setLoad])

    return (
        <div className={load ? "fadeIn" : "fadeOut"}>
            <div className="background">
                <Perfil />
            </div>
            <Descricao />
            <Cursos />
            <Footer />
        </div>
    )
}

export default Home;