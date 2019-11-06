import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'reactstrap';



function manageVideosModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.headerTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{'max-height': 'calc(100vh - 200px)', 'overflow-y': 'auto'}}>
        
        
          {props.description}
        
      </Modal.Body>
      <Modal.Footer>

        <Button onClick={props.onHide}>Close</Button>
        {props.footerbutton}

      </Modal.Footer>
    </Modal>
  );
}


export default manageVideosModal;