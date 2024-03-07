import { useState, useEffect } from "react";
import { BASE_URL } from "../config";

export function useGetPatients() {
    const [patients, setPatients] = useState([]);

    const gtPatients = async () => {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        setPatients(data.data);
    }

    useEffect(() => {
        gtPatients()
    }, []);

    return {patients, refetch: gtPatients};
}
