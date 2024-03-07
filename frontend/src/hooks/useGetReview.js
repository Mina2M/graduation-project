import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export function useGetReviews(id) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`);
            const data = await res.json();
            setReviews(data.data);
        })();
    }, []);

    return reviews;
}