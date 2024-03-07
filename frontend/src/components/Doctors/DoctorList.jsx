import React from 'react'
import DoctorCard from './DoctorCard'
import { BASE_URL } from '../../config';
import { useGetGeneric } from '../../hooks/useGetDoctors';

const DoctorList = () => {
    const { data: doctors } = useGetGeneric('/doctors');

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
            {/* {doctors.map(d => <DoctorCard key={d.id} doctor={d} />)} */}
            {
                doctors.map((d, idx) => (
                    <div key={idx}>
                        <DoctorCard doctor={d} />

                    </div>
                ))
            }
        </div>
    )
}

export default DoctorList;
