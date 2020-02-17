import React from 'react';

import './footer.css';

import mail from './imagens/mail.svg'
import phone from './imagens/phone.svg'
import home from './imagens/home.svg'
import uerj from './imagens/uerj.svg'

const Footer = props => {
    return (
        <footer>
            <div className="mt-5 pt-5 pb-5 footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-xs-12 about-company">
                            <h2>Perfil:</h2>
                            <p className="pr-5 text-white-50">Em busca de projetos que tenham embutido conhecimento agregado </p>
                            
                        </div>
                        <div className="col-lg-4 col-xs-12 links">
                            <h4 className="mt-lg-0 mt-sm-3">Links</h4>
                            <ul className="m-0 p-0">
                                <li><a href="http://www.iprj.uerj.br/"><img className="logoUerj" src={uerj} alt="logo uerj"/></a></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-xs-12 location">
                            <h4 className="mt-lg-0 mt-sm-4">Endereço</h4>
                            <p><img className="icons" src={home} alt="icon" />Rua José Aristides Pereira, Solares, Nova Friburgo - Lote 13</p>
                            <p className="mb-0"><img className="icons" alt="icon" src={phone} />(541) 754-3010</p>
                            <p><img className="icons" alt="icon" src={mail}/>joãovitormunizlopes@gmail.com.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;