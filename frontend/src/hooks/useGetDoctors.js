import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../config";

export function useGetGeneric(path) {
    const [data, setData] = useState([]);

    const getData = useCallback(async () => {
        const res = await fetch(`${BASE_URL}${path}`);
        const dataInner = await res.json();
        setData(dataInner.data);
    }, [])

    useEffect(() => {
        getData()
    }, []);

    return { data, refetch: getData };
}
