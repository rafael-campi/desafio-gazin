import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

function NivelForm(props) {
    const [nivel, setNivel] = useState(props?.nivel?.nivel || '');
    const [botao, setBotao] = useState('Salvar');
    const [botaoDisabled, setBotaoDisabled] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSaveNivel = async () => {
        setBotao('Salvando...');
        setBotaoDisabled(true);
        try {
            let response;
            if (props?.nivel?.id) {
                response = await fetch(`${import.meta.env.VITE_API_URL}/api/niveis/${props.nivel.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'nivel': nivel }),
                });
            } else {
                response = await fetch(`${import.meta.env.VITE_API_URL}/api/niveis`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'nivel': nivel }),
                });
            }

            const data = await response.json();
            console.log(response.status);
            if (response.status == 404) {
                Object.entries(data.data).forEach(function ([key, value]) {
                    throw new Error(value[0]);
                });

                throw new Error(JSON.stringify(data.data?.nivel[0]));
            }

            props.onSaveSuccess();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); // Fecha o Toast após 3 segundos
        } catch (error) {
            console.error('Erro ao salvar nível:', error);
            
            setErrorMessage(error.message);
            
            setShowError(true);
        }
        setBotao('Salvar');
        setBotaoDisabled(false);
    };

    const handleInputChange = (event) => {
        setNivel(event.target.value);
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicNivel">
                <Form.Label>Nível</Form.Label>
                <Form.Control
                    type="text"
                    value={nivel}
                    placeholder="Digite o nivel"
                    onChange={handleInputChange}
                />
                <br />
                <Button variant="primary" disabled={botaoDisabled} onClick={handleSaveNivel}>
                    {botao}
                </Button>
            </Form.Group>
            <Toast show={showSuccess} onClose={() => setShowSuccess(false)} delay={3000} autohide>
                <Toast.Body>Operação concluída com sucesso!</Toast.Body>
            </Toast>
            <Toast show={showError} onClose={() => setShowError(false)} delay={3000} autohide bg="danger">
                <Toast.Body>{errorMessage}</Toast.Body>
            </Toast>
        </Form>
    );
}

export default NivelForm;
