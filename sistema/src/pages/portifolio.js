import React from 'react';
import {useHistory} from 'react-router-dom'

import './portifolio.css'

import Add from './icons/plus.png'

const Portifolio = props => {

    const history=useHistory();

    return (
        <button onClick={()=>history.push('/novoprojeto')} className="button-cad-projeto"><img src={Add} alt="novo projeto"/></button>
    )
}

export default Portifolio;