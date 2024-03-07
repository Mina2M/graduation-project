import { useEffect, useState, useContext } from 'react'
import { authContext } from '../context/AuthContext.jsx'

const useFetchData = url => {

    const [stats, setStats] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { token, role } = useContext(authContext)

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true)

            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` }
                })


                const result = await res.json()
                console.log(result)
                if (!res.ok) {
                    throw new Error(result.message)
                    // return toast.error(result.message)
                }
                setData(result.data)
                setStats(result)
                setLoading(false)

            } catch (err) {
                setLoading(false)
                setError(err.message)
            }
        }

        fetchData()
    }, [url])

    return {
        data,
        stats,
        loading,
        error,
    }
}

export default useFetchData