import React, { useState, useContext } from 'react';
import Card from '../components/UIElements/Card'
import './login.css';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from './../components/util/validators';
import { useHttpClient } from '../components/hooks/http-hook'
import AuthContext from '../components/context/auth-context'
import ErrorModal from '../components/modal/errormodal'

const Login = props => {

    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);

    const {error, sendRequest,clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const submitHandler = async event => {
        event.preventDefault();

        try {

            const responseData = await sendRequest(
                `http://localhost:5000/api/user/login`,
                'POST',
                JSON.stringify({
                    login: login,
                    password: password
                }), {
                'Content-Type': 'application/json'
            }
            )
            auth.login(responseData.userId, responseData.token)

        } catch (err) {

        }

    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} /> 
            <Card>
                <div>
                    <h3>Login:</h3>
                    <div className="form">
                        <form autoComplete="off" className="login-form" onSubmit={submitHandler}>
                            <input
                                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                                type="email"
                                placeholder="Login"
                                id="email"
                                autoComplete="new-login"
                                name="login"
                                onChange={e => setLogin(e.target.value)}
                            />
                            <input
                                validators={[VALIDATOR_REQUIRE()]}
                                type="password"
                                placeholder="password"
                                id="password"
                                autoComplete="new-password"
                                name="email"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </Card>
        </React.Fragment>
    )
}

export default Login;