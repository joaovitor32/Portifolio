import React from 'react';

import './contato.css';

import Footer from '../footer/footer.js' 

const FormContato = props=>{
    return (
        <React.Fragment>
            <div className="container-form">
                <div className="box-form">
                    <strong>Entre em contato:</strong>
                    <div className="box-inputs">
                        <form>
                            <div>
                                <label for="username">Nome:</label>
                                <input type="text" id="username" name="username"/>
                            </div>
                            <div>
                                <label for="username">Email:</label>
                                <input type="text" id="username" name="username"/>
                            </div>
                            <div>
                                <label for="username">Mensagem:</label>
                                <textarea id="w3mission" rows="4" ></textarea>
                            </div>
                            <button className="button-form" type="submit">Mandar</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </React.Fragment>
    )
}

export default FormContato;