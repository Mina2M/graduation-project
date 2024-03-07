import styled from "styled-components";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetGeneric } from "../../../hooks/useGetDoctors";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config";
import { useEffect } from "react";
import { useState } from "react";




export default function DoctorList() {


    const navigate = useNavigate()
    const { data: doctors, refetch } = useGetGeneric('/doctors/admin');
    console.log('hook Doctors', doctors)

    const [isApproved, setIsApproved] = useState("approved");
    console.log("doctorAppr", isApproved)

    const handleDeleteDoctor = async (id) => {
        // here we use api 
        const res = await fetch(`${BASE_URL}/doctors/${id}`, {
            method: 'DELETE',

        })
        const result = await res.json()
        console.log('result-delete', result)
        await refetch()
    }


    const handleDoctorApproved = async (id) => {

        const res = await fetch(`${BASE_URL}/doctors/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ isApproved })
        })
        const result = await res.json()
        console.log('result-mongo', result.data.isApproved)
        await refetch()
        // window.location.href = result.url.url

    }

    // useEffect(() => {
    //     async function handleDeleteDoctor() {
    //         try {
    //             const res = await fetch(`${BASE_URL}/doctors/${id}`, {
    //                 method: 'DELETE',

    //             })
    //             const result = await res.json()
    //             console.log('result-delete', result)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     handleDeleteDoctor();
    // }, [])


    const rows = doctors && doctors.map(doctor => {
        return {
            id: doctor._id,
            email: doctor.email,
            imageUrl: doctor.photo,
            name: doctor.name,
            specialization: doctor.specialization,
            status: doctor.isApproved,
            price: doctor.ticketPrice,

        }
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 210 },
        { field: 'email', headerName: 'Email', width: 120 },
        {
            field: 'imageUrl', headerName: 'Image', width: 90,
            renderCell: (params) => {
                return (
                    <ImageContainer>
                        <img src={params.row.imageUrl} alt="" />
                    </ImageContainer>
                )
            }
        },
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'specialization', headerName: 'Specialization', width: 120, },
        { field: 'price', headerName: 'ticketPrice', width: 90, },
        // { field: 'status', headerName: 'isApproved', width: 100, },

        {
            field: 'status', headerName: 'isApproved', width: 100,
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

        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 280,
            renderCell: (params) => {
                return (
                    <Actions>
                        <Delete onClick={() => handleDeleteDoctor(params.row.id)}>Delete</Delete>
                        <View onClick={() => navigate(`/doctors/${params.row.id}`)}>View</View>

                        <select id="state" onClick={() => handleDoctorApproved(params.row.id)} onChange={(e) => setIsApproved(e.target.value)}>
                            <option value="pending">pending</option>
                            <option value="approved">approved</option>
                            <option value="cancelled">cancelled</option>
                        </select>
                        <Option onClick={() => handleDoctorApproved(params.row.id)}>
                            Ok
                        </Option>
                        {/* <input
                            type="String"
                            id="cancelled"
                            name="cancelled "
                            // value={qualification.sDate}
                            onChange={(e) => setDoctorApprove(e.target.value)}
                            required */}
                        {/* className='form__input mt-1' /> */}
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

const ImageContainer = styled.div`
    img {
        height: 40px;
    }
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

const Delete = styled.button`
    background-color: rgb(255, 77, 73);
`;
const View = styled.button`
    background-color: rgb(114, 255, 40);
`;
const Option = styled.button`
    border: none;
    background-color: rgb(38, 198, 249);

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