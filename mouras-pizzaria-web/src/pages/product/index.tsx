import { Header } from "../../components/Header"
import Head from "next/head"
import styles from './style.module.scss';
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "../../services/apiClient";
import { toast } from "react-toastify";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { setupAPIClient } from "@/services/api";

type ItemProps = {
    id: number;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<File|null>(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    function cleanFields() {
        setName('');
        setPrice('');
        setDescription('');
        setAvatarUrl('');
        setImageAvatar(null);
        setCategorySelected(0);
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            const formData = new FormData();
    
            if(!(name && price && description && imageAvatar && categorySelected != null)) {
                return;
            }
            
            formData.append('name', name);
            formData.append('price', String(price));
            formData.append('description', description);
            formData.append('file', imageAvatar);
            formData.append('category_id', String(categories[categorySelected].id));
            
            await api.post('/product', formData);

            cleanFields();
            toast.success('Produto cadastrado com sucesso');
            
        } catch (error) {
            console.log(error);
            toast.error('Não foi possível cadastrar o produto')
        }
    }

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if(!event.target.files) return;

        const image = event.target.files[0];

        if (!image) return;

        if (['image/jpeg', 'image/png'].includes(image.type)) {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    }

    function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
        setCategorySelected(Number(e.target.value));
    }

    return (
        <>
            <Head>
                <title>Novo produto - MourasPizza</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <h1>Novo Produto</h1>
                <form className={styles.form} onSubmit={handleRegister}>
                    <select value={categorySelected} onChange={(e) => handleChangeCategory(e)}> 
                        {categories.map((x, index) => {
                            return (
                                <option key={x.id} value={index}>
                                    {x.name}
                                </option>
                            )
                        })}
                    </select>
                    
                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={30} color="#FFF" />
                        </span>
                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>
                        {avatarUrl && (
                            <Image className={styles.preview} src={avatarUrl} alt="Foto do Produto" width={250} height={250} />
                        )}
                    </label>

                    <input type="text" placeholder="Nome do Produto" className={styles.input} value={name} onChange={(e) => setName(e.target.value)}/>
                    
                    <input type="number" placeholder="Preço do Produto" className={styles.input} value={price} onChange={(e) => setPrice(e.target.value)}/>

                    <textarea placeholder="Descreva seu produto..." className={styles.input} value={description} onChange={(e) => setDescription(e.target.value)}/>

                    <button type="submit" className={styles.buttonAdd}>Cadastrar</button>
                </form>
            </main>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/category').then((res) => res.data).catch((err)=> {
        console.log(err);
        toast.error('Erro ao consultar categorias')
    });

    return {
        props: {
            categoryList: response
        }
    }
})
