import React from 'react';

import './MainNavigation.css';

import MainHeader from './MainHeader';
import './MainHeader.css';

import NavLinks from './NavLinks'

const MainNavigation = props =>{
    return (
        <MainHeader >
            <div className="nav-links_box" >
                <div className="nav-links_left">
                    <NavLinks type="text" path="/home" nome="Home"/>
                    <NavLinks type="text" path="/portifolio" nome="Projetos"/>
                    <NavLinks type="text" path="/contato" nome="Contato"/>
                </div>
            </div>
        </MainHeader>
    )

}

export default MainNavigation;
