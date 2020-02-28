import React, { useEffect, useState, useContext, useCallback } from 'react';

import { useHttpClient } from '../components/hooks/http-hook';
import AuthContext from '../components/context/auth-context'

import ContentTable from '../components/UIElements/messages/TableMessages'
import Card from '../components/UIElements/Card'
import LoadingSpinner from '../components/UIElements/LoadingSpinner'

import './message.css'

const Mensagem = props => {


    const { isLoading, sendRequest, error } = useHttpClient();
    const auth = useContext(AuthContext);
    const [loadedMessages, setLoadedMessages] = useState();

    const fetchMessages = useCallback(async () => {
        setLoadedMessages(null);
        try {
            const responseData = await sendRequest(
                'http://localhost:5000/api/messages/listamensagens'
                ,
                "GET",
                null
                , {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + auth.token

                })

            setLoadedMessages(responseData.messages);

        } catch (err) {

        }
    }, [auth, sendRequest])

    useEffect(
        () => {
            fetchMessages();
        }, [fetchMessages]);

    const onDelete = () => {
        fetchMessages();
    }

    return (
        <React.Fragment>
            {isLoading && !loadedMessages && <LoadingSpinner />}
            {!isLoading && loadedMessages &&
                <div className="boxTabela">
                    <table >
                        <thead>
                            <tr>
                                <th >Nome:</th>
                                <th >Email:</th>
                                <th >Mensagem:</th>
                                <th >Operações:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ContentTable messages={loadedMessages} onDelete={onDelete} />
                        </tbody>
                    </table>
                </div>}
            {!isLoading && error &&
                <Card type="box-error-message">
                    <h3>Não há nenhuma mensagem disponível</h3>
                </Card>
            }
        </React.Fragment>

    )
}

export default Mensagem;