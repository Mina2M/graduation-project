import styled from "styled-components";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config";
import { useEffect } from "react";
import { useState } from "react";
import { useGetBookings } from "../../../hooks/useGetBooking";
import { formateDate } from "../../../utils/formateDate";



export default function AppointmentList() {
    // const navigate = useNavigate()
    const { bookings, refetch } = useGetBookings()
    console.log("Bookings", bookings)

    const [status, setStatus] = useState('pending')

    console.log('Status', status)
    // dete status
    const handleAppointmentApproved = async (id) => {
        console.log(id)
        const res = await fetch(`${BASE_URL}/booking/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ status })
        })
        await fetch(`${BASE_URL}/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookingId: id })
        })
        const result = await res.json()
        console.log('result-mongo', result)
        await refetch()
        // window.location.href = result.url.url

    }


    const rows = bookings && bookings.map(booking => {
        return {
            id: booking._id,
            doctor: booking.doctor.email,
            patient: booking.user.email,
            price: booking.ticketPrice,
            status: booking.status,
            date: formateDate(booking.appointmentDate),

            // imageUrl: doctor.photo,
            // name: doctor.name,
            // specialization: doctor.specialization,

        }
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'doctor', headerName: 'Email-Doctor', width: 130 },
        { field: 'patient', headerName: 'Email-Patient', width: 130 },
        { field: 'price', headerName: 'ticketPrice', width: 100, },
        // { field: 'status', headerName: 'Status', width: 100, },

        {
            field: 'status', headerName: 'Status', width: 100,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.status == "pending" ? <Pending>Pending</Pending> :
                            params.row.status == "approved" ? < Approved > Approved</Approved> :
                                params.row.status == "cancelled" ? < Cancelled > Cancelled</Cancelled> : ''
                        }
                    </div >
                )
            }
        },

        { field: 'date', headerName: 'Appointment-Date', width: 140, },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 170,
            renderCell: (params) => {
                return (
                    <Actions>
                        <ApproveBtn onClick={() => handleAppointmentApproved(params.row.id) && setStatus('approved')}>Approve</ApproveBtn>
                        <CancelBtn onClick={() => handleAppointmentApproved(params.row.id) && setStatus('cancelled')}>Cancel</CancelBtn>
                    </Actions>
                )
            }
        },
    ];



    return (

        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

const CancelBtn = styled.button`
    background-color: #dc2626;
`;
const ApproveBtn = styled.button`
    background-color: rgb(38, 198, 249);
`;
const View = styled.button`
    background-color: rgb(114, 255, 40);
`;
const Actions = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
        border: none;
        outline: none;
        padding: 3px 5px;
        color: white;
        border-radius: 3px;
        cursor: pointer;

    }
`;

const Pending = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12); 
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px; 
`;
const Cancelled = styled.div`
    color: rgb(38, 198, 249);
    background-color: rgb(38, 198, 249, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;
const Approved = styled.div`
    color: rgb(102, 108, 255);
    background-color: rgb(102, 108, 255, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;

