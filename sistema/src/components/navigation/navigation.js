import React ,{useContext} from 'react';
import {NavLink} from 'react-router-dom';

import AuthContext from '../context/auth-context';

import turnoff from './icons/turn-off.svg';

import './navigation.css'

const Navigation = props =>{
    const auth=useContext(AuthContext);
    return (
        <header className="header">
            <nav>
                <ul className="menu">
                   {auth.isLoggedIn&&<li><NavLink type="text"  to="/mensagem" nome="Mensagem">Mensagem</NavLink></li>}
                </ul>
            </nav>
            {auth.isLoggedIn&&<img onClick={auth.logout} className="turnoff" src={turnoff} alt="turn off"/>}
        </header>   
    )

}

export default Navigation;