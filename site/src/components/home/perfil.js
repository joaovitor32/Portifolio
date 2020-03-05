import React from 'react';

import './perfil.css'

import perfil from './images/perfil.jpg'
import php from './images/php.svg'
import angular from './images/angular.png'
import node from './images/node.png'
import javascript from './images/js.png'
import html from './images/html.png'
import css from './images/css.png'
import mysql from './images/mysql.png'
import mongo from './images/mongo.jpg'
import react from './images/react.png'

const Perfil = props=>{
    
   
    return (
        <React.Fragment>
            <div className="container container-perfil">
                <div className="row row-display-home">
                    <div className="col-md-6 col-sm-12" >
                        <div className="hTagsBox">
                            <h2>Aspirante a programador!</h2>
                            <h5>Entusiasta do desenvolvimento Web e Mobile</h5>
                            <hr></hr>
                            <div className="boxIcons">
                                <img src={php} alt='php'/>
                                <img src={angular} alt='angular'/>
                                <img src={node} alt='node'/>
                                <img src={javascript} alt='javascript'/>
                                <img src={html} alt='html'/>
                                <img src={css} alt='css'/>
                                <img src={mysql} alt='mysql'/>
                                <img src={mongo} alt='mongo'/>
                                <img src={react} alt='react'/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <img className="imgPerfil" alt="perfil" src={perfil}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Perfil;