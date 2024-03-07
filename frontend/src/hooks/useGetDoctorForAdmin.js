import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export function useGetDoctorsForAdmin() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${BASE_URL}/doctors/doctors-admin`);
            const data = await res.json();
            setDoctors(data.data);
        })();
    }, []);

    return doctors;
}
