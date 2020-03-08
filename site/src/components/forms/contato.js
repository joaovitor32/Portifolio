import React, { useState } from 'react';

import './contato.css';

import Footer from '../footer/footer.js'
import Arrow from './icons/next.svg';

import { useHttpClient } from '../../components/hooks/http-hooks';

const FormContato = props => {

    const { sendRequest } = useHttpClient();

    const initialState = {
        name: "",
        email: "",
        mensagem: "",
    }

    const [state, setState] = useState({ ...initialState });

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const resetForm = ()=>{
        document.getElementById('form').reset();
        setState({...initialState});
    }

    const createMensagem = async e=>{
        e.preventDefault();
        
        try{

            await sendRequest(
                'http://localhost:5000/api/messages/newmessage',
                'POST',
                JSON.stringify({
                    name:state.name,
                    email:state.email,
                    mensagem:state.mensagem
                }),
                {
                    "Content-Type": "application/json",
                }
            )
        }catch(err){

        }
        resetForm();
    }

    return (
        <React.Fragment>
            <div className="container-contact">
                <div className="content-top">
                    <h4>Entre em contato!</h4>
                    <h6>Sinta-se livre para deixar uma mensagem!</h6>
                </div>
                <div className="container-form">
                    <form id="form" onSubmit={createMensagem}>
                        <div>
                            <label forhtml="name">Nome:</label>
                            <input
                                type="text"
                                placeholder="Digite seu nome..."
                                id="name"
                                name="name"
                                autoComplete="off"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label forhtml="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Digite o seu email..."
                                name="email"
                                autoComplete="off"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label forhtml="mensagem">Mensagem:</label>
                            <textarea
                                type="mensagem"
                                placeholder="Digite a sua mensagem..."
                                id="mensagem"
                                name="mensagem"
                                autoComplete="off"
                                onChange={handleChange}
                            />
                        </div>
                        <button className="button-form" type="submit">
                            <p>Submit</p>
                            <img className="arrow" src={Arrow} alt="arrow-left" />
                        </button>
                    </form>
                </div>

            </div>
            <Footer></Footer>
        </React.Fragment>
    )
}

export default FormContato;