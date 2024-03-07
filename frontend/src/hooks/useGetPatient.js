import { useState, useEffect } from "react";
import { BASE_URL } from "../config";

export function useGetPatient(id) {
    const [patient, setPatient] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${BASE_URL}/users/${id}`);
            const data = await res.json();
            setPatient(data.data);
        })();
    }, []);

    return patient;
}
