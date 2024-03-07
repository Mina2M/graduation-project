import styled from "styled-components";
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../config';
import { NavLink, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import Summary from '../../dashboard/admin-account/Summary'
// import { FaUsers, FaStore, FaClipboard, FaTachometer } from "react-icons/fa";
import { FaUsers, FaStore, FaClipboard, FaTachometerAlt, FaClinicMedical, FaNotesMedical } from "react-icons/fa"
import { LuMessageSquare } from "react-icons/lu"



const AdminDashboard = () => {
    // const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/admin-dashboard`)
    // console.log('***')
    // console.log(userData, 'userdata')

    return (

        <StyledDashboard>
            <SideNav>
                <h3>dashboard</h3>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                    }
                    to="/admin-dashboard/summary"
                >

                    <FaClinicMedical /> Summary
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                    }
                    to="/admin-dashboard/doctors"
                >
                    <FaNotesMedical />Doctors
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                    }
                    to="/admin-dashboard/appointments"
                >
                    <FaTachometerAlt /> Appointments
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                    }
                    to="/admin-dashboard/users"
                >
                    <FaUsers /> Users
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                    }
                    to="/admin-dashboard/messages"
                >
                    <LuMessageSquare /> Messages
                </NavLink>
            </SideNav>
            <Content>
                {/* <Summary /> */}
                <Outlet />
            </Content>
        </StyledDashboard>
    );
};

export default AdminDashboard;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
    display: flex;
    align-items: center;
    font-weight: 700;

    svg {
        margin-right: 0.5rem;
        font-size: 18px;
    }
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;
// export default AdminDashboard;