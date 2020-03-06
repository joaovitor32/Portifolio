import React from 'react';

import './descricao.css'

import Serra1 from './images/serra1.jpg'
import Serra2 from './images/serra2.jpg'
import Serra3 from './images/serra3.jpg'

const Descricao = props => {
    return (
        <div className="descricao-content">
            <div className="box-descricao">
                <p>
                    Iniciei no mundo da programação com 19 anos por meio do Instituto Politécnico
                    do Rio de Janeiro, Entrei no curso de Engenharia da Computação da Uerj em 2016.1 e a partir de
                    2017.2 ingressei na Serra Jr Engenharia que era a empresa júnior da minha faculdade e recomendo para quem possua
                    a oportunidade a fazer o mesmo, dessa forma
                    entrei em contato com o desenvolvimento web e suas tecnologias.
            </p>
            </div>
            <div className="box-images-descricao">
                <img src={Serra1} alt="serra1" />
                <img src={Serra3} alt="serra3" />
                <img src={Serra2} alt="serra1" />
            </div>
        </div>
    )
}

export default Descricao;