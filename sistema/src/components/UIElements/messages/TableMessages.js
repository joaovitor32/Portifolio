import React, { useContext } from 'react';

import './TableMessages.css';
import Trash from '../icons/trash.svg'

import { useHttpClient } from '../../hooks/http-hook'
import AuthContext from '../../context/auth-context'

const ContentTable = props => {

    const { sendRequest } = useHttpClient();

    const auth = useContext(AuthContext);

    const deleteHandler = async (id) => {

        try {

            await sendRequest(
                `http://localhost:5000/api/messages/${id}`,
                'DELETE',
                null,
                {
                    Authorization:'Bearer '+auth.token 
                }
            )
    
        } catch (err) {

        }
        props.onDelete();
    }

    return (

        props.messages.map(message =>
            <tr key={message._id}>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.mensagem}</td>
                <td><img className="trash" onClick={() => deleteHandler(message._id)} src={Trash} alt="trash" /></td>
            </tr>

        )

    )

}
export default ContentTable;