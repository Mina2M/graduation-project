import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../config";

export function useGetBookings() {
    const [bookings, setBookings] = useState([]);

    const getBookings = useCallback(async () => {
    
        const res = await fetch(`${BASE_URL}/doctors/all/bookings`);
        const data = await res.json();
        setBookings(data.data);
    }, [])

    useEffect(() => {
        getBookings()
    }, []);

    return { bookings, refetch: getBookings };
}