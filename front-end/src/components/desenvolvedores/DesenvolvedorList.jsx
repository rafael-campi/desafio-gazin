// src/components/NivelTable.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DesenvolvedorForm from './DesenvolvedorForm';
import ModalDefault from '../ModalDefault';
import AlertDefault from '../AlertDeafault';
Modal.setAppElement('#root');

const DesenvolvedorList = () => {
    const [desenvolvedores, setDesenvolvedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [erroMessage, setErroMessage] = useState(false);
    const [nomeSearchTerm, setNomeSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = nomeSearchTerm ? `?nome=${encodeURIComponent(nomeSearchTerm)}` : '';
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/desenvolvedores${query}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados.');
                }
                const data = await response.json();
                setDesenvolvedores(data.data);
                setLoading(false);
            } catch (error) {
                setErroMessage('Erro ao buscar dados.');
                setErro(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [nomeSearchTerm]);

    const handleUpdateList = async () => {
        setLoading(true);
        try {
            const query = nomeSearchTerm ? `?nome=${encodeURIComponent(nomeSearchTerm)}` : '';
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/desenvolvedores${query}`);
            if (!response.ok) {
                throw new Error('Erro ao atualizar dados.');
            }
            const datar = await response.json();
            setDesenvolvedores(datar.data);
        } catch (error) {
            console.error('Erro ao atualizar desenvolvedores:', error);
            setErroMessage('Erro ao atualizar dados.');
            setErro(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Deseja continuar?")) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/desenvolvedores/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Erro ao excluir desenvolvedor.');
                }
                await handleUpdateList();
            } catch (error) {
                console.error('Erro ao excluir desenvolvedor:', error);
                setErroMessage('Erro ao excluir desenvolvedor.');
                setErro(true);
            }
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar por nome do desenvolvedor..."
                value={nomeSearchTerm}
                onChange={(e) => setNomeSearchTerm(e.target.value)}
            />
            <br /> <br />
            <ModalDefault name='Novo desenvolvedor' button='primary' data={null} modal={<DesenvolvedorForm onSaveSuccess={handleUpdateList} />} /> 

            <table className="tabela table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sexo</th>
                        <th>Data de nascimento</th>
                        <th>Hobby</th>
                        <th>Idade</th>
                        <th>Nível</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {desenvolvedores.map((desenvolvedor) => (
                        <tr key={desenvolvedor.id}>
                            <td>{desenvolvedor.id}</td>
                            <td>{desenvolvedor.nome}</td>
                            <td>{desenvolvedor.sexo}</td>
                            <td>{desenvolvedor.data_nascimento}</td>
                            <td>{desenvolvedor.hobby}</td>
                            <td>{desenvolvedor.idade}</td>
                            <td>{desenvolvedor.nivel.nivel}</td>
                            <td>

                                <ModalDefault name='Editar desenvolvedor' data={desenvolvedor} modal={<DesenvolvedorForm onSaveSuccess={handleUpdateList} desenvolvedor={desenvolvedor} />} button='success' />
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(desenvolvedor.id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {erro && (
                <AlertDefault message={erroMessage} />
            )}
        </div>
    );
};

export default DesenvolvedorList;
