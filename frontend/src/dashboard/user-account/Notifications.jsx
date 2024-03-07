import { useCallback, useEffect, useState } from 'react'
import { BASE_URL } from '../../config'

const Notifications = () => {
    const [notifications, setNotifications] = useState(['first', 'second'])

    const getNotifications = useCallback(() => {
        return fetch(`${BASE_URL}/notifications`).then((res) => res.json()).then(setNotifications).catch(console.error)
    }, [])

    useEffect(() => {
        getNotifications()
    }, [])

    const handleDelete = async (id) => {
        await fetch(`${BASE_URL}/notifications/${id}`, { method: 'DELETE' }).catch(console.error)
        await getNotifications()
    }

    return (
        <div className='flex flex-col items-center gap-y-4 mt-4'>
            {notifications.map((n, idx) => (
                <div key={idx} className='p-3 border rounded border-gray-300 w-full flex items-center justify-between'>
                    {n.text}
                    <button className='ml-auto' onClick={() => handleDelete(n._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 text-red-500 h-4 w-4"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Notifications
