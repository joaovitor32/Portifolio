import React from 'react';

import './Card.css';

const Card=props=>{
    return (
        <div className={`generic-card ${props.type}`}>
            {props.children}
        </div>
    )
}
export default Card;