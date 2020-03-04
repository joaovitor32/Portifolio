import React from 'react';

import { NavLink } from 'react-router-dom';
import './Navigation.css';

import facebook from './icons/facebook.svg'
import github from './icons/github.svg'
import linkedin from './icons/linkedin.svg'

const Navigation = props => {
    return (
        <header >
            <nav >
                <ul className="menu">
                    <li><NavLink type="text" to="/home" nome="Home">Home</NavLink></li>
                    <li><NavLink type="text" to="/portifolio" nome="Projetos" >Projetos</NavLink></li>
                    <li><NavLink type="text" to="/contato" nome="Contatos" >Contato</NavLink></li>
                </ul>
            </nav>
            <div className="links-sites" >
                <a href="https://www.facebook.com/joao.buzina"><img alt="facebook" src={facebook} /></a>
                <a href="https://www.linkedin.com/in/jo%C3%A3o-vitor-muniz-lopes-3545a3154/"><img alt="linkedin" src={linkedin} /></a>
                <a href="https://github.com/joaovitor32"><img className="aRefs" alt="github" src={github} /></a>
            </div>
        </header>
    )
}

export default Navigation;
