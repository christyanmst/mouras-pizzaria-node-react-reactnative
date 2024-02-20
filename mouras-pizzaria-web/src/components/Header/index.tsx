import styles from './styles.module.scss';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import Image from 'next/image';

export function Header() {

    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={"/dashboard"}>
                    <Image src="/logo.svg" alt="Logo Mouras Pizzaria" width={190} height={60} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href={"/category"}>
                        <span>Categoria</span>
                    </Link>

                    <Link href={"/product"}>
                        <span>Cardápio</span>
                    </Link>
                    
                    <button onClick={signOut}>
                        <FiLogOut color="#FFF" size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}