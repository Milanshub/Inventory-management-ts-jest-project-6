import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, seetLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error: any){
                setError(error.message);
            } finally {
                seetLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return {data, loading, error};
};

