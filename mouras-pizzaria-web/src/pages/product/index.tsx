import SearchForm from "@/components/Application/Product/SearchForm";
import { Header } from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Page() {
    const Router = useRouter();

    return (
        <>
            <Head>
                <title>Visualizar Produtos - MourasPizza</title>
            </Head>
            <Header />
            <SearchForm />
        </>
        
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: { }
    }
})