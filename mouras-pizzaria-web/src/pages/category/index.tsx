import { Header } from "../../components/Header"
import Head from "next/head"
import styles from './style.module.scss';
import { FormEvent, useState } from "react";
import { api } from "../../services/apiClient";
import { toast } from "react-toastify";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category() {
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if(!name) return;

        await api.post('/category', {
            name
        }).then((res) => {
            toast.success('Categoria cadastrada com sucesso');
            setName('');
        }).catch((err) => {
            toast.error('Não foi possível cadastrar a categoria')
        });
    }
    return (
        <>
            <Head>
                <title>Categorias - MourasPizza</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <h1>Cadastrar categorias</h1>
                <form className={styles.form} onSubmit={handleRegister}>
                    <input type="text" placeholder="Digite o nome da categoria" className={styles.input} value={name} onChange={(e) => setName(e.target.value)}/>
                
                    <button type="submit" className={styles.buttonAdd}>Cadastrar</button>
                </form>
            </main>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})
