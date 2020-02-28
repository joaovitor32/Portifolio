import React from 'react'

import Modal from './modal';
import './modal.css';
import Close from './icon/close.jpg'
import './errormodal.css';

const ErrorModal = props => {
    return (
      <Modal
        onCancel={props.onClear}
        header="Um erro aconteceu!"
        show={!!props.error}
        close={<button className="button-close" onClick={props.onClear}><img className="close"  src={Close} alt="close"/></button>}
      >
        <p>{props.error}</p>
      </Modal>
    );
  };
  
  export default ErrorModal;