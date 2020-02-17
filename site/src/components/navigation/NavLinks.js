import  React from 'react';

import './NavLink.css';

import {NavLink} from 'react-router-dom';

const NavLinks = props=>{
    return (
         <li className="nav-item">
            <NavLink className="nav-link links" to={props.path}>{props.nome}</NavLink>
        </li>
    )
}
export default NavLinks
