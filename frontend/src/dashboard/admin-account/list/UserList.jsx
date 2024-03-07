import styled from "styled-components";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetPatients } from "../../../hooks/useGetPatients";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config";
import { useEffect } from "react";
import { useState } from "react";




export default function UserList() {
    const navigate = useNavigate()
    const { patients, refetch } = useGetPatients()
    console.log('hook Patients', patients)


    const handleDeleteDoctor = async (id) => {
        // here we use api 
        const res = await fetch(`${BASE_URL}/users/${id}`, {
            method: 'DELETE',

        })
        const result = await res.json()
        console.log('result-delete', result)
        await refetch()
    }



    const rows = patients && patients.map(patient => {
        return {
            id: patient._id,
            email: patient.email,
            imageUrl: patient.photo,
            name: patient.name,
            role: patient.role,
            // price: patient.ticketPrice,

        }
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'email', headerName: 'Email', width: 160 },
        {
            field: 'imageUrl', headerName: 'Image', width: 80,
            renderCell: (params) => {
                return (
                    <ImageContainer>
                        <img src={params.row.imageUrl} alt="" />
                    </ImageContainer>
                )
            }
        },
        { field: 'name', headerName: 'Name', width: 90 },
        { field: 'role', headerName: 'Role', width: 100, },
        // { field: 'price', headerName: 'ticketPrice', width: 130, },

        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 130,
            renderCell: (params) => {
                return (
                    <Actions>
                        <Delete onClick={() => handleDeleteDoctor(params.row.id)}>Delete</Delete>
                        <View onClick={() => navigate(`/users/${params.row.id}`)}>View</View>
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
    background-color: rgb(114, 255, 40);

`;