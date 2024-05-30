// src/components/NivelTable.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import NivelForm from './NivelForm';
import ModalDefault from '../ModalDefault';
import Toast from 'react-bootstrap/Toast';
Modal.setAppElement('#root');

const NivelList = () => {
    const [niveis, setNiveis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [erroMessage, setErroMessage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

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
        } finally {
            setDeleteModalOpen(false);
            setDeleteId(null);
        }
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedNiveis = [...niveis].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return null;
        }
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeleteId(null);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <input
                className="input-search"
                type="text"
                placeholder="Buscar por nível..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Toast className="toast-notification-list" onClose={() => setErro(false)} show={erro} delay={3000} autohide bg="danger">
                <Toast.Body>{erroMessage}</Toast.Body>
            </Toast>
            <br /><br />
            <ModalDefault nameClass="class-button-new" name='Novo nível' button='primary' data={null} modal={<NivelForm onSaveSuccess={handleUpdateList} />} /><br />

            <table className="table tabela">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('id')} className="order-column">
                            ID {getSortIcon('id')}
                        </th>
                        <th onClick={() => requestSort('nivel')} className="order-column">
                            Nome {getSortIcon('nivel')}
                        </th>
                        <th onClick={() => requestSort('associados')} className="order-column">
                            Desenvolvedores associados {getSortIcon('associados')}
                        </th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedNiveis.map((nivel) => (
                        <tr key={nivel.id}>
                            <td>{nivel.id}</td>
                            <td>{nivel.nivel}</td>
                            <td>{nivel.associados}</td>
                            <td>
                                <ModalDefault name='Editar nível' data={nivel} modal={<NivelForm onSaveSuccess={handleUpdateList} nivel={nivel} />} button='success' />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    style={{ marginLeft: '5px', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                    onClick={() => openDeleteModal(nivel.id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={deleteModalOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Confirmar Exclusão"
                className="modal-delete"
                overlayClassName="Overlay"
            >
                <div className="modal-div-delete">
                    <h2>Confirmar Exclusão</h2>
                    <p>Você tem certeza que deseja excluir este nível?</p>
                    <button
                        onClick={() => handleDelete(deleteId)}
                        className="btn btn-danger"
                        style={{ marginRight: '10px', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Excluir
                    </button>
                    <button
                        onClick={closeDeleteModal}
                        className="btn btn-secondary"
                        style={{ padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default NivelList;
