import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDefault(props) {
    const [show, setShow] = useState(false);
    const [nivelData, setNivelData] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button className={props?.nameClass} variant={props.button} onClick={handleShow}>
                {props.name}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.modal}</Modal.Body>
                
            </Modal>
        </>
    );
}

export default ModalDefault;