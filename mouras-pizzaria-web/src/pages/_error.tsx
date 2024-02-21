import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ErrorPage() {
    const router = useRouter();
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        toast.warning('Página não encontrada');
        router.push('/dashboard');
      }
    }, [router]);
  
    return <></>;
  }
