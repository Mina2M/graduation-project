import styled from "styled-components";
import { useGetBookings } from "../../../hooks/useGetBooking";
import { useGetGeneric } from "../../../hooks/useGetDoctors";
import { useGetPatients } from "../../../hooks/useGetPatients";
import { BASE_URL } from "../../../config";
// import { useSelector } from "react-redux";


const AllTimeData = () => {
    const { bookings } = useGetBookings();
    const { data: doctors } = useGetGeneric('/doctors');
    const { patients: users } = useGetPatients();



    return <Main>
        <h3>All Time Data</h3>
        <Info>
            <Title>Users</Title>
            <Data>{users.length}</Data>
        </Info>
        <Info>
            <Title>Doctors</Title>
            <Data>{doctors.length}</Data>
        </Info>
        <Info>
            <Title>Bookings</Title>
            <Data>{bookings.length}</Data>
        </Info>
        {/* <Info>
            <Title>Earnings</Title>
            <Data>$30,000</Data>
        </Info> */}
    </Main>
}

export default AllTimeData

const Main = styled.div`
    background: rgb(48, 51, 78);
    color: rgba(234, 234, 255, 0.87);
    margin-top: 1.5 rem;
    border-radius: 5px;
    padding: 1rem;
    font-size: 14px;
`
const Info = styled.div`
    display: flex;
    margin-top: 1rem;
    padding: 0.3rem;
    border-radius: 3px;
    background: rgba(38, 198, 249, 0.12);
    &:nth-child(even) {
        background: rgba(102, 108, 255, 0.12);
    }
`;
const Title = styled.div`
    flex: 1;
`;
const Data = styled.div`
    flex: 1;
    font-weight: 700;
`;


