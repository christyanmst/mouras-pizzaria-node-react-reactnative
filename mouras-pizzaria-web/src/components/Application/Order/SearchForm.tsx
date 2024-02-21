import Router from 'next/router';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/services/apiClient';
import { FiRefreshCcw } from 'react-icons/fi';
import { ModalOrder } from './ModalOrderItems';

type Orders = {
    id: number;
    name: string;
    table_number: string;
}[]

export type OrderItems = {
    id: number;
    amount: number;
    product: {
      id: number;
      category_id: number;
      name: string;
      price: number;
      description: string;
      banner: string;
    };
    order: {
        id: number;
        table: number;
        status: boolean;
        name?: string;
    }
  }[]

export default function SearchForm() {
    const [orders, setOrders] = useState<Orders>([]);
    const [loading, setLoading] = useState(false);
    const [modalItem, setModalItem] = useState<OrderItems>([]);
    const [modalItemVisible, setModalItemVisible] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            await getOrders();
            setLoading(false);
        };

        fetchData();
    }, []);

    async function getOrders() {
        try {
            const response = await api.get('/order/currentOrders');
            const orders: Orders = response.data;
            setOrders(orders);
        } catch (error) {
            toast.error('Erro ao obter pedidos');
        }
    }

    async function handleOpenModalView(id: number){
      
        const response = await api.get(`/order/detail/${id}`);
   
        setModalItem(response.data);
        setModalItemVisible(true);
     }

    return (
        <>
            <div className={styles.containerSearchForm}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button onClick={() => getOrders() }>
                        <FiRefreshCcw size={25} color="#3fffa3" />
                    </button>
                </div>

                <article className={styles.listOrders}>
                    { orders.map((x) => (
                        <section key={x.table_number} className={styles.orderItem}>
                            <button onClick={() => handleOpenModalView(x.id)}>
                                <div className={styles.tag} />
                                <span>{`Mesa ${x.table_number}`}</span>
                            </button>
                        </section>
                    ))}
                </article>
            </div>

            { modalItemVisible && <ModalOrder isOpen={modalItemVisible} onRequestClose={() => setModalItemVisible(false)} onCompleteOrder={getOrders} order={modalItem} />}
        
        </>
    )
}

