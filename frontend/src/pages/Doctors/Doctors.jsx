import React, { useState, useContext, useEffect } from 'react'
import DoctorCard from '../../components/Doctors/DoctorCard'
import Testimonial from '../../components/Testimonial/Testimonial'
import { useGetGeneric } from '../../hooks/useGetDoctors'
import { BASE_URL } from '../../config';


const Doctors = () => {
    const { data: doctors } = useGetGeneric('/doctors');

    const [query, setQuery] = useState("")
    const [data, setData] = useState([])

    const handleSubmitSearch = async e => {
        e.preventDefault()
        console.log(query)
        const res = await fetch(`${BASE_URL}/doctors/?query=${query}`);
        const data = await res.json();
        console.log(data.data[0])

        setData(data.data);
    }

    return <>
        <section className='bg-[#f0fdf4]'>
            <div className="container text-center ">
                <h2 className='heading'>Find a Doctor</h2>
                <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                    <input onChange={(e) => setQuery(e.target.value)} type="search" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor' placeholder='Search Doctor' />
                    <button onClick={handleSubmitSearch} className='btn mt-0 rounded-[0px] rounded-r-md'>Search</button>

                </div>
            </div>
        </section>

        <section>
            <div className="container">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {/* {doctors.map(doctor => (<DoctorCard key={doctor.id} doctor={doctor} />))} */}
                    {
                        data.length == 0 ?
                            doctors.map((d, idx) => (
                                <div key={idx}>
                                    <DoctorCard doctor={d} />

                                </div>
                            )) : data.map((d, idx) => (
                                <div key={idx}>
                                    <DoctorCard doctor={d} />

                                </div>
                            ))
                    }
                </div>
            </div>
        </section>
    </>
}

export default Doctors