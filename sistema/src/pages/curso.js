import React from 'react';
import { useHistory } from 'react-router-dom';


import Add from './icons/plus.png'
import './NovoCurso.css'
import './button.css'

const Curso = props => {

    const history = useHistory();

    return (
        <React.Fragment>
            <div className="button-div">
                <button type="button" onClick={() => history.push('/novocurso')} ><img className="button-cad" src={Add} alt="add-novo-curso" /></button>
            </div>
        </React.Fragment>
    )
}

export default Curso;