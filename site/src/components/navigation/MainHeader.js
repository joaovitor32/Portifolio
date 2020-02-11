import React from 'react';
import './MainHeader';

const MainHeader = props =>{
    return  (
        <header role="banner">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <div id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {props.children}
                    </ul>
                </div>
            </nav>
        </header>
    )

}
export default MainHeader;