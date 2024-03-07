import React from 'react'
import { formateDate } from '../../utils/formateDate'
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../config';
import avatar from '../../assets/images/avatar-icon.png'

const Appointments = () => {

    const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`)
    console.log('*** App')
    // console.log(userData.appointments[0].user.photo)




    return (
        <div className="flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">NAME</th>
                                    <th scope="col" className="px-6 py-4">PAYMENT</th>
                                    <th scope="col" className="px-6 py-4">PRICE</th>
                                    <th scope="col" className="px-6 py-4">APPOINTMENT-DATE</th>
                                </tr>
                            </thead>


                            <tbody>
                                {

                                    userData.appointments?.map((b, idx) => (

                                        <tr className="border-b dark:border-neutral-500" key={idx}>
                                            <tr>
                                                <td className='flex gap-1 rounded-full'>
                                                    <figure className='w-6 h-6 rounded-full mt-3'>
                                                        <img className='w-full' src={b.user.photo} alt="" />
                                                    </figure>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4">{b.user.name}</td>
                                            </tr>



                                            <td className="whitespace-nowrap px-6 py-4">{b.status}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{b.ticketPrice}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{formateDate(b.appointmentDate)}</td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Appointments 