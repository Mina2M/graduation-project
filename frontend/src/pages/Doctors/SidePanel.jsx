import React, { useState, useContext } from 'react'
import { useGetDoctor } from '../../hooks/useGetDoctor'
// import { useGetBookings } from '../../hooks/useGetBooking'

import { useParams } from 'react-router-dom'
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';

const SidePanel = () => {


    const { id } = useParams();
    const { token } = useContext(authContext)

    // const booking = useGetBookings(id);
    // console.log(booking[0].doctor)
    // console.log(booking[0].user.name)


    const doctor = useGetDoctor(id);
    // console.log(doctor.name)
    const { ticketPrice } = doctor;
    console.log(doctor)
    const [appointmentDate, setAppointmentDate] = useState("");
    // const [booking, setBooking] = useState({
    //     ticketPrice: ticketPrice,
    // });

    const handleSubmitBooking = async e => {
        e.preventDefault();

        // here we use api 

        console.log(id)
        console.log(token)
        const res = await fetch(`${BASE_URL}/doctors/${id}/bookings`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ ticketPrice, appointmentDate })
        })
        const result = await res.json()
        window.location.href = result.url.url

        // console.log(result.url.url)
        // .then((res) => {
        //     console.log(res .json().data)
        //     if (res.data.BASE_URL) {
        //         window.location.href = res.data.BASE_URL
        //     }
        // }).catch((err) => console.log(err.message))
    }
    // payment integration
    // const makePayment = async e => {
    //     e.preventDefault()


    //     // here we use api 
    //     console.log('mina')
    //     console.log(id)
    //     console.log(token)

    //     const res = await fetch(`${BASE_URL}/booking/${id}/`, {
    //         method: 'post',  
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${token}`
    //         },
    //         body: JSON.stringify({ reviewText })
    //     })

    //     // const data = await res.json();
    //     console.log('******************doc')


    // }

    return (
        <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
            <div className="flex items-center justify-between">
                <p className='text_para mt-0 font-semibold'>Ticket Price</p>
                <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>${ticketPrice}</span>
            </div>

            <div className="mt-[30px]">
                <p className='text_para mt-0 font-semibold text-headingColor'>Available Time Slots:</p>
                <ul className='mt-3'>
                    {
                        doctor.timeSlots?.map((t, idx) => (
                            <div key={idx}>
                                <li className="flex items-center justify-between mb-2 ">
                                    <p className='text-[15px] leading-6 text-textColor font-semibold'>{t.day}</p>
                                    <p className='text-[15px] leading-6 text-textColor font-semibold'>{t.sTime} PM - {t.eTime} PM</p>
                                </li>
                            </div>
                        ))
                    }
                </ul>
            </div>
            <br />
            <div>
                <input
                    type="date"
                    id="sDate"
                    name="sDate"
                    // value={qualification.sDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                    className='form__input mt-1' />
            </div>

            <button className='btn px-2 w-full rounded-md' onClick={handleSubmitBooking}>Book Appointment</button>

        </div>
    )
}

export default SidePanel