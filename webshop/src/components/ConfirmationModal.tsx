import { forwardRef, useImperativeHandle, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ConfirmationModalInterface {
    onDelete: () => void,
    message: string
}

const ConfirmationModal = forwardRef((props: ConfirmationModalInterface, ref) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  //siin on loetelu kõikidest funktsioonidest, mida saab parent useRef abil välja kutsuda
  useImperativeHandle(ref, () => ({
    setShow
  }));

  return (
    <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Warning message</Modal.Title>
          </Modal.Header>
          <Modal.Body>You are about to delete {props.message}! This is irreversible!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={props.onDelete}>
              Yes delete
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
})

export default ConfirmationModal