import Modal from 'react-modal';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import { OrderItems } from './SearchForm';
import { toast } from 'react-toastify';
import { api } from '@/services/apiClient';

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onCompleteOrder: () => Promise<void>;
    order: OrderItems;
}

Modal.setAppElement('#__next');

export function ModalOrder({ isOpen, onRequestClose, onCompleteOrder, order }: ModalOrderProps) {

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'
        }
    }

    function calculateTotal() {
        let total = 0;
        order.forEach(item => {
            total += item.amount * item.product.price;
        })

        return total.toFixed(2);
    }

    async function finishOrder(orderId: number) {
        try {
            await api.put(`/order/finish/${orderId}`);
            toast.success('Pedido finalizado com sucesso');
            await onCompleteOrder();
            onRequestClose();
        } catch (error) {
            toast.error('Não foi possível finalizar o pedido.');
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} >
            <button className="react-modal-close" onClick={onRequestClose} style={{ background: 'transparent', border: 0 }}>
                <FiX size={45} color="#f34738" />
            </button>

            <div className={styles.containerModal}>
                <h2>Detalhes do pedido</h2>
                <span className={styles.tableModal}>
                    Mesa: <strong>{order[0].order.table}</strong>
                </span>

                {order.map(item => (
                    <section key={item.id} className={styles.containerModalItem}>
                        <span>{item.amount} - <strong>{item.product.name}</strong> - R$ {Number(item.product.price).toFixed(2)} </span>
                        <span className={styles.modalDescription}>{item.product.description}</span>
                    </section>
                ))}

                <span className={styles.tableModal}>Total do Pedido: R$ {calculateTotal()}</span>

            </div>
            <button className={styles.modalButtonOrder} onClick={() => finishOrder(order[0].order.id)}>
                Concluir pedido
            </button>
        </Modal>
    )
}