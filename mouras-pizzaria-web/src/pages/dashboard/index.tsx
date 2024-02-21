import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/Header";
import SearchForm from "@/components/Application/Order/SearchForm";

export default function Dashboard() {
    return(
        <>
            <Head>
                <title>Painel - MourasPizza</title>
            </Head>
            <Header />
            <SearchForm />
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})