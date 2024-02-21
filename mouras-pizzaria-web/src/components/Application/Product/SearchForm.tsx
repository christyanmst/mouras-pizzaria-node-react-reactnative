import Router from 'next/router';
import styles from './style.module.scss';
import { CustomizedTable, TableColumns } from '@/components/ui/Table';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/services/apiClient';

type Products = {
    id: number;
    name: string;
    description: string;
    banner: string;
    price: number;
}[]

export default function SearchForm() {
    const [products, setProducts] = useState<Products>([]);
    const [loading, setLoading] = useState(false);

    const columns: TableColumns = [
        {
            name: 'banner',
            value: '',
            accessor: 'banner',
        },
        {
            name: 'name',
            value: 'Nome',
            accessor: 'name',
        },
        {
            name: 'description',
            value: 'Descrição',
            accessor: 'description',
        },
        {
            name: 'price',
            value: 'Preço',
            accessor: 'price',
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            await getProducts();
            setLoading(false);
        };

        fetchData();
    }, []);

    async function getProducts() {
        try {
            const response = await api.get('/product/getAllProducts');
            const products: Products = response.data;
            setProducts(products);
        } catch (error) {
            toast.error('Erro ao obter produtos');
        }
    }

    function handleEdit(id: number) {
        Router.push(`/product/update/${id}`);
    }

    function handleDelete(id: number) {
        console.log(id);

    }

    return (
        <div className={styles.containerSearchForm}>
            <button className={styles.buttonSearchForm} onClick={() => Router.push('/product/create')}>Novo produto</button>
            <CustomizedTable columns={columns} data={products} pageSize={15} extraBtns={true} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    )
}

