import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Alert } from 'react-bootstrap';

function AlertDefault(props) {
    const [show, setShow] = useState(true);

    return (
        <div className="App">
            <Container className='p-4'>
                <Alert variant="danger">{props.message}</Alert>
            </Container>
        </div> 
    );
}

export default AlertDefault;