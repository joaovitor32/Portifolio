import React from 'react';

import './BoxForm.css'

import Card from '../UIElements/Card'

const BoxForm = props => {

    return (
        <Card>
            <div className="container-form">
                <div className="box-form">
                    <div className="title">
                        <h4>{props.label}</h4>
                    </div>
                    <div className="box-inputs">
                        {props.children}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default BoxForm;