import React, { useEffect, useState, useContext } from 'react';
import { useHttpClient } from '../components/hooks/http-hook';
import AuthContext from '../components/context/auth-context'
import ContentTable from '../components/UIElements/Table'
import Card from '../components/UIElements/Card'

import './message.css'

const Mensagem = props => {

    const { isLoading, sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);
    const [loadedMessages, setLoadedMessages] = useState();

    useEffect(
        () => {
            const fetchMessages = async () => {
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
                    console.log(responseData.messages)
                } catch (err) {

                }
            }

            fetchMessages();
        }, [sendRequest, auth]);

    return (
        <React.Fragment>
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
                        {!isLoading && loadedMessages && <ContentTable messages={loadedMessages} />}
                    </tbody>
                </table>
                {!isLoading && !loadedMessages &&
                    <Card>
                        <h3>Não há nenhuma mensagem disponível</h3>
                    </Card>
                }
            </div>
        </React.Fragment>

    )
}

export default Mensagem;