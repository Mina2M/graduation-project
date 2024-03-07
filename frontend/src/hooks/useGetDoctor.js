import { useState, useEffect } from "react";
import { BASE_URL } from "../config";

export function useGetDoctor(id) {
    const [doctor, setDoctor] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${BASE_URL}/doctors/${id}`);
            const data = await res.json();
            setDoctor(data.data);
        })();
    }, []);

    return doctor;
}
