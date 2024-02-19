import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/home.module.scss';

import logoImg from '../../public/logo.svg';

import { Input } from '../components/ui/Input/index';
import { Button } from '../components/ui/Button/index';

export default function Home() {
  return (
    <>
      <Head>
        <title>
          MourasPizzaria - Faça seu login
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Mouras Pizzaria" />
        <div className={styles.login}>
          <form>
            <Input placeholder='Digite seu e-mail' type='text' maxLength={100} />
            
            <Input placeholder='Digite sua senha' type='password' maxLength={20} />

            <Button type="submit" loading={false}>Acessar</Button>

            <span className={styles.text}>Não possui uma conta? Cadastre-se</span>
          </form>
        </div>
      </div>
    </>
  );
}
