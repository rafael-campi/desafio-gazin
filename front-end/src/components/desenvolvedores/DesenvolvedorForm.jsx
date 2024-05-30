import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

function DesenvolvedorForm(props) {
    const [desenvolvedor, setDesenvolvedor] = useState({
        nome: props?.desenvolvedor?.nome || '',
        sexo: props?.desenvolvedor?.sexo || '',
        data_nascimento: props?.desenvolvedor?.data_nascimento || '',
        hobby: props?.desenvolvedor?.hobby || '',
        nivel_id: props?.desenvolvedor?.nivel.id || '',
    });
    const [niveis, setNiveis] = useState([]);
    const [botao, setBotao] = useState('Salvar');
    const [botaoDisabled, setBotaoDisabled] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchNiveis = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/niveis`);
                const data = await response.json();
                setNiveis(data.data);
            } catch (error) {
                console.error('Erro ao buscar níveis:', error);
            }
        };

        fetchNiveis();
    }, []);

    const handleSaveDesenvolvedor = async () => {
        setBotao('Salvando...');
        setBotaoDisabled(true);
        try {
            let response;
            if (props?.desenvolvedor?.id) {
                response = await fetch(`${import.meta.env.VITE_API_URL}/api/desenvolvedores/${props.desenvolvedor.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(desenvolvedor),
                });
            } else {
                response = await fetch(`${import.meta.env.VITE_API_URL}/api/desenvolvedores`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(desenvolvedor),
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
        const { name, value } = event.target;
        setDesenvolvedor((prevDesenvolvedor) => ({
            ...prevDesenvolvedor,
            [name]: value,
        }));
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    name="nome"
                    value={desenvolvedor.nome}
                    placeholder="Digite o nome"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSexo">
                <Form.Label>Sexo</Form.Label>
                <Form.Control
                    type="text"
                    name="sexo"
                    value={desenvolvedor.sexo}
                    placeholder="Digite o sexo"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDataNascimento">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                    type="date"
                    name="data_nascimento"
                    value={desenvolvedor.data_nascimento}
                    placeholder="Digite a data de nascimento"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHobby">
                <Form.Label>Hobby</Form.Label>
                <Form.Control
                    type="text"
                    name="hobby"
                    value={desenvolvedor.hobby}
                    placeholder="Digite o hobby"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNivelId">
                <Form.Label>Nível</Form.Label>
                <Form.Control
                    as="select"
                    name="nivel_id"
                    value={desenvolvedor.nivel_id}
                    onChange={handleInputChange} >
                    <option value="">Selecione um nível</option>
                    {niveis.map((nivel) => (
                        <option key={nivel.id} value={nivel.id}>
                            {nivel.nivel}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Toast show={showSuccess} onClose={() => setShowSuccess(false)} delay={3000} autohide>
                <Toast.Body>Operação concluída com sucesso!</Toast.Body>
            </Toast>
            <Toast show={showError} onClose={() => setShowError(false)} delay={3000} autohide bg="danger">
                <Toast.Body>{errorMessage}</Toast.Body>
            </Toast>

            <Button variant="primary" disabled={botaoDisabled} onClick={handleSaveDesenvolvedor}>
                {botao}
            </Button>
        </Form>
    );
}

export default DesenvolvedorForm;
