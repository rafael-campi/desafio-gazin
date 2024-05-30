// src/components/DesenvolvedorTable.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DesenvolvedorForm from './DesenvolvedorForm';
import ModalDefault from '../ModalDefault';
import Toast from 'react-bootstrap/Toast';
Modal.setAppElement('#root');

const DesenvolvedorList = () => {
    const [desenvolvedores, setDesenvolvedores] = useState([]);
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
                const query = searchTerm ? `?nome=${encodeURIComponent(searchTerm)}` : '';
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
    }, [searchTerm]);

    const handleUpdateList = async () => {
        setLoading(true);
        const query = searchTerm ? `?nome=${encodeURIComponent(searchTerm)}` : '';

        try {
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
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/desenvolvedores/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao excluir desenvolvedor.');
            }

            await handleUpdateList();
        } catch (error) {
            console.error('Erro ao excluir desenvolvedor:', error);
            setErroMessage(error.message || 'Erro ao excluir desenvolvedor.');
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

    const sortedDesenvolvedores = [...desenvolvedores].sort((a, b) => {
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
                placeholder="Buscar por nome do desenvolvedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Toast className="toast-notification-list" onClose={() => setErro(false)} show={erro} delay={3000} autohide bg="danger">
                <Toast.Body>{erroMessage}</Toast.Body>
            </Toast>
            <br /><br />
            <ModalDefault nameClass="class-button-new" name='Novo desenvolvedor' button='primary' data={null} modal={<DesenvolvedorForm onSaveSuccess={handleUpdateList} />} /><br />

            <table className="tabela table">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('id')} className="order-column">
                            ID {getSortIcon('id')}
                        </th>
                        <th onClick={() => requestSort('nome')} className="order-column">
                            Nome {getSortIcon('nome')}
                        </th>
                        <th onClick={() => requestSort('sexo')} className="order-column">
                            Sexo {getSortIcon('sexo')}
                        </th>
                        <th onClick={() => requestSort('data_nascimento')} className="order-column">
                            Data de nascimento {getSortIcon('data_nascimento')}
                        </th>
                        <th onClick={() => requestSort('hobby')} className="order-column">
                            Hobby {getSortIcon('hobby')}
                        </th>
                        <th onClick={() => requestSort('idade')} className="order-column">
                            Idade {getSortIcon('idade')}
                        </th>
                        <th onClick={() => requestSort('nivel')} className="order-column">
                            Nível {getSortIcon('nivel')}
                        </th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedDesenvolvedores.map((desenvolvedor) => (
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
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    style={{ marginLeft: '5px', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                    onClick={() => openDeleteModal(desenvolvedor.id)}
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
                    <p>Você tem certeza que deseja excluir este desenvolvedor?</p>
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

export default DesenvolvedorList;
