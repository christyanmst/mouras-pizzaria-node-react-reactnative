import SearchForm from "@/components/Application/Product/SearchForm";
import { Header } from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";

export default function Page() {
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
