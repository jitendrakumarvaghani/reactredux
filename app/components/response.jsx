import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

const Response = props => (
  <Modal
    bsSize="sm"
    backdrop="static"
    show
    autoFocus
    keyboard={false}
    className="vertical-center request-sent"
  >
    <Modal.Header>
      <Modal.Title>
        All done!
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <span>You will be one of the first to experience<br />
        Brocoli & Co. when we launch.
      </span>
    </Modal.Body>
    <Modal.Footer>
      <Button block bsStyle="default" onClick={() => props.showHome()}>OK</Button>
    </Modal.Footer>
  </Modal>
);
Response.propTypes = {
  showHome: PropTypes.func.isRequired,
};
export default Response;
