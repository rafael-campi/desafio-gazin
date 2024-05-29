import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

function NivelForm(props) {
    const [nivel, setNivel] = useState(props?.nivel?.nivel);
    const [botao, setBotao] = useState('Salvar');
    const [botaoDisabled, setbotaoDisabled] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSaveNivel = async () => {
        setBotao('Salvando...');
        setbotaoDisabled(true);
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
                props.onSaveSuccess();
            } else {
                response = await fetch(`${import.meta.env.VITE_API_URL}/api/niveis`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'nivel': nivel }),
                });
                props.onSaveSuccess();
            }
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); // Fecha o Toast após 3 segundos

        } catch (error) {
            console.error('Erro ao salvar nível:', error);
            setErrorMessage('Erro ao salvar nível.');
            setShowError(true);
        }
        setBotao('Salvar');
        setbotaoDisabled(false);
    };

    const handleInputChange = (event) => {
        setNivel(event.target.value);
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nível</Form.Label>
                <Form.Control
                    type="text"
                    value={nivel} // Use value ao invés de defaultValue para controlar o valor do campo
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
