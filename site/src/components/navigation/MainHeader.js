import React from 'react';
import './MainHeader';

import facebook from './icons/facebook.svg'
import github from './icons/github.svg'
import linkedin from './icons/linkedin.svg'

const MainHeader = props =>{
    return  (
        <header role="banner">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="nav-links_left" id="navbarSupportedContent">
                    <ul className="navbar-nav navUl">
                        {props.children}
                    </ul>
                </div>
                <div className="nav-links_right" >
                    <a href="https://www.facebook.com/joao.buzina"><img className="aRefs" alt="facebook" src={facebook}/></a>
                    <a href="https://www.linkedin.com/in/jo%C3%A3o-vitor-muniz-lopes-3545a3154/"><img className="aRefs" alt="linkedin" src={linkedin}/></a>
                    <a href="https://github.com/joaovitor32"><img className="aRefs" alt="github" src={github}/></a>
                </div>
            </nav>
        </header>
    )

}
export default MainHeader;