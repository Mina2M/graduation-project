import { useState, useEffect } from "react";
import { BASE_URL } from "../config";

export function useGetMessage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${BASE_URL}/messages/`);
            const data = await res.json();
            setMessages(data.data);
        })();
    }, []);

    return messages;
}
