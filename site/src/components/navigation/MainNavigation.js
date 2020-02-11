import React from 'react';
import {Link} from 'react-router-dom';

import './MainNavigation.css';

import MainHeader from './MainHeader';
import './MainHeader.css';

import NavLinks from './NavLinks'

const MainNavigation = props =>{
    return (
        <MainHeader >
            <NavLinks path="/home" nome="Home"/>
            <NavLinks path="/portifolio" nome="Portifólio"/>
            <NavLinks path="/contato" nome="Contato"/>
        </MainHeader>
    )

}

export default MainNavigation;
