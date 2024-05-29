// src/components/NivelTable.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import NivelForm from './NivelForm';
import ModalDefault from '../ModalDefault';
import AlertDefault from '../AlertDeafault';
Modal.setAppElement('#root');

const NivelList = () => {
    const [niveis, setNiveis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [erroMessage, setErroMessage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = searchTerm ? `?nivel=${encodeURIComponent(searchTerm)}` : '';
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/niveis${query}`);

                if (!response.ok) {
                    throw new Error('Erro ao buscar dados.');
                }

                const data = await response.json();
                setNiveis(data.data);
                setLoading(false);
            } catch (error) {
                setErroMessage('Erro ao buscar dados.');
                setErro(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm]);

    const handleUpdateList = async () => {
        setLoading(true);
        const query = searchTerm ? `?nivel=${encodeURIComponent(searchTerm)}` : '';

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/niveis${query}`);

            if (!response.ok) {
                throw new Error('Erro ao atualizar dados.');
            }

            const datar = await response.json();
            setNiveis(datar.data);
        } catch (error) {
            console.error('Erro ao atualizar níveis:', error);
            setErroMessage('Erro ao atualizar dados.');
            setErro(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Deseja continuar?")) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/niveis/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao excluir nível.');
                }

                await handleUpdateList();
            } catch (error) {
                console.error('Erro ao excluir nível:', error);
                setErroMessage(error.message || 'Erro ao excluir nível.');
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
                placeholder="Buscar por nível..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {erro && (
                <AlertDefault message={erroMessage} />
            )}<br /><br />
            <ModalDefault name='Novo nível' button='primary' data={null} modal={<NivelForm onSaveSuccess={handleUpdateList} />} /><br/>
            
            <table className="tabela table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Desenvolvedores associdados</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {niveis.map((nivel) => (
                        <tr key={nivel.id}>
                            <td>{nivel.id}</td>
                            <td>{nivel.nivel}</td>
                            <td>{nivel.associados}</td>
                            <td>
                                
                                <ModalDefault name='Editar nível' data={nivel} modal={<NivelForm onSaveSuccess={handleUpdateList} nivel={nivel} />} button='success'  />
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(nivel.id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default NivelList;
