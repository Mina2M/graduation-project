import React from 'react'
import { useGetPatient } from '../../hooks/useGetPatient'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
    let { id } = useParams()
    console.log('first id', id)
    const user = useGetPatient(id)
    console.log('hook Patients', user)


    return <>
        <div className="pb-[50px] px-[30px] rounded-md">
            <div className='flex items-center justify-center'>

                <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                    <img src={user.photo} alt="" className='w-full h-full rounded-full' />
                </figure>
            </div>

            <div className="text-center mt-4">
                <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{user.name}</h3>
                <p className='text-textColor text-[15px] leading-6 font-medium'>{user.email}</p>

                <p className='text-textColor text-[15px] leading-6 font-medium'>
                    Blood Type: <span className='ml-2 text-headingColor text-[22px] leading-8'>{user.bloodType}</span>
                </p>
            </div>



        </div>
    </>
}

export default UserProfile