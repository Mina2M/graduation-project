import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BASE_URL } from '../../../config.js'

const Chart = () => {

    const [sales, setSales] = useState([])
    const [loading, setLoading] = useState(false)

    function compare(a, b) {
        if (a._id < b._id) {
            return 1
        }
        if (a._id > b._id) {
            return -1
        }
        return 0;
    }


    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const res = await fetch(`${BASE_URL}/booking/week-sales`);
                const result = await res.json();
                result.sort(compare)
                console.log("7days", result)

                const newData = result.map((item) => {
                    const DAYS = [
                        "Sun",
                        "Mon",
                        "Tues",
                        "Wed",
                        "Thurs",
                        "Fri",
                        "Sat",
                    ]

                    return {
                        day: DAYS[item._id - 1],
                        amount: item.total
                    };
                });

                console.log("newData", newData);
                setSales(newData)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)

            }
        }
        fetchData();
    }, [])


    return <>
        {
            loading ? <Loader>Loading Chart...</Loader> :
                <StyledChart>
                    <h3>Last 7 Days Earnings(EG $)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={sales}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </StyledChart>
        }
    </>
};

export default Chart

const StyledChart = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 2rem;
    padding: 1rem;
    border: 2px solid rgba(48, 51, 78, 0.2);
    border-radius: 5px;
    h3 {
        margin-bottom: 1rem;
    }
`;

const Loader = styled.p`
    margin-top: 2rem;
`;
