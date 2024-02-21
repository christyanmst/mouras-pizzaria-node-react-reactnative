import styles from './style.module.scss';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { api } from "../../../services/apiClient";
import { toast } from "react-toastify";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { setupAPIClient } from "@/services/api";
import Router from "next/router";


interface ProductProps {
    product_id?: number;
}

type ItemProps = {
    id: number;
    name: string;
}[]


export default function DetailForm({ product_id }: ProductProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);
    const [categories, setCategories] = useState<ItemProps>([]);
    const [categorySelected, setCategorySelected] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (product_id) {
                await getProductInfo();
            }
            await getCategories();
            setLoading(false);
        };

        fetchData();
    }, [product_id]);

    async function getProductInfo() {
        try {
            const response = await api.get(`/product/${product_id}`);
            const { name, price, description, banner, category_id } = response.data;

            setName(name);
            setPrice(price);
            setDescription(description)
            setCategorySelected(category_id);

            getFileFromUrl(banner);
        } catch (error) {
            Router.push('/');
            toast.error('Não foi possível obter informações sobre esse Produto');
        }
    }

    async function getCategories() {
        try {
            const result = await api.get(`/category`);
            const categories: ItemProps = result.data

            setCategories(categories);
        } catch (error) {
            toast.error('Erro ao consultar categorias')
        }
    }

    async function getFileFromUrl(imageName: string) {
        const imageType = imageName.split('.').pop();
        const urlImage = `http://localhost:3333/files/${imageName}`

        fetch(urlImage)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], imageName, { type: `image/${imageType}` });
                setImageAvatar(file);
                setAvatarUrl(urlImage);
            })
            .catch(error => {
                console.error('Erro ao carregar a imagem do avatar:', error);
            });
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            const formData = new FormData();

            if (!(name && price && description && imageAvatar && categorySelected != null)) {
                return;
            }

            formData.append('name', name);
            formData.append('price', String(price));
            formData.append('description', description);
            formData.append('file', imageAvatar);
            formData.append('category_id', String(categorySelected));

            const result = await api.post('/product', formData);

            toast.success('Produto cadastrado com sucesso');
            Router.push(`/product2/${result.data.id}`);

        } catch (error) {
            console.log(error);
            toast.error('Não foi possível cadastrar o produto')
        }
    }

    async function handleEdit(event: FormEvent) {
        event.preventDefault();
        try {
            const formData = new FormData();

            if (!(name && price && description && imageAvatar && categorySelected != null)) {
                return;
            }

            formData.append('name', name);
            formData.append('price', String(price));
            formData.append('description', description);
            formData.append('file', imageAvatar);
            formData.append('category_id', String(categories[categorySelected].id));
            formData.append('product_id', String(product_id));

            await api.put(`/product`, formData);

            toast.success('Produto editado com sucesso');
            Router.push('/');

        } catch (error) {
            console.log(error);
            toast.error('Não foi possível editar o produto')
        }
    }

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

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
        <div className={styles.container}>
            <h1>{product_id ? 'Editar Produto' : 'Novo Produto'}</h1>
            <form className={styles.form} onSubmit={(e) => product_id ? handleEdit(e) : handleRegister(e)}>
                <select value={categorySelected} onChange={(e) => handleChangeCategory(e)}>
                    {categories.map((x) => {
                        return (
                            <option key={x.id} value={x.id}>
                                {x.name}
                            </option>
                        )
                    })}
                </select>

                <label className={styles.labelAvatar}>
                    <span>
                        <FiUpload size={30} color="#FFF" />
                    </span>

                    <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />
                    
                    {avatarUrl && (
                        <Image className={styles.preview} src={avatarUrl} alt="Foto do Produto" width={250} height={250} />
                    )}
                </label>

                <input type="text" placeholder="Nome do Produto" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />

                <input type="number" placeholder="Preço do Produto" className={styles.input} value={price} onChange={(e) => setPrice(e.target.value)} />

                <textarea placeholder="Descreva seu produto..." className={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} />

                <button type="submit" className={styles.buttonAdd}>{product_id ? 'Editar' : 'Cadastrar'}</button>
            </form>
        </div>
    )
}
