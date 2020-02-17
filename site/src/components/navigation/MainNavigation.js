import React from 'react';

import './MainNavigation.css';

import MainHeader from './MainHeader';
import './MainHeader.css';

import NavLinks from './NavLinks'

const MainNavigation = props =>{
    return (
        <MainHeader >
            <div className="nav-links_box" >
                <NavLinks class='NavLink' type="text" path="/home" nome="Home"/>
                <NavLinks class='NavLink' type="text" path="/portifolio" nome="Projetos"/>
                <NavLinks class='NavLink' type="text" path="/contato" nome="Contato"/>
            </div>
        </MainHeader>
    )

}

export default MainNavigation;
