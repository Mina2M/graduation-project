import React from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Doctors from '../pages/Doctors/Doctors'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
import AdminDashboard from '../dashboard/admin-account/Dashboard'
import MyAccount from "../dashboard/user-account/MyAccount"


import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from '../dashboard/doctor-account/Dashboard'

import Success from '../pages/Success'
import Cancel from '../pages/Cancel'
import ModelPage from '../pages/ModePage'
import Summary from '../dashboard/admin-account/Summary'
import DoctorsDash from '../dashboard/admin-account/DoctorsDash'
import DoctorList from '../dashboard/admin-account/list/DoctorList'
import Profile from '../dashboard/doctor-account/Profile'
import AppointmentsDash from '../dashboard/admin-account/AppointmentsDash'
import UsersDash from '../dashboard/admin-account/UsersDash'
import Appointment from '../dashboard/Details/Appointment'
import UserProfile from '../dashboard/Details/UserProfile'
import AppointmentList from '../dashboard/admin-account/list/AppointmentList'
import MessageList from '../dashboard/admin-account/list/MessageList'
// import CreateDoctor from '../dashboard/admin-account/CreateDoctor'

const Routers = () => {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/model" element={<ModelPage />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        {/* <Route path="/users/:id" element={<UserProfile />} /> */}


        {/* admin-dashboard */}
        <Route path="/appointment/:id" element={<Appointment />} />
        <Route path="/users/:id" element={<UserProfile />} />

        <Route path="/admin-dashboard/" element={<AdminDashboard />}>
            <Route path="doctors" element={<DoctorsDash />}>
                <Route index element={<DoctorList />} />
                {/* <Route path="create-doctor" element={<CreateDoctor />} /> */}

                {/* <Route path="create-doctor" element={<Dashboard />} /> */}
            </Route>
            <Route path='' element={<Navigate to="summary" />} />
            <Route path="summary" element={<Summary />} />
            <Route path="appointments" element={<AppointmentList />} />
            <Route path="users" element={<UsersDash />} />
            <Route path="messages" element={<MessageList />} />




        </Route>




        <Route path="/users/profile/me"
            element={
                <ProtectedRoute allowedRoles={['patient']}>
                    <MyAccount />
                </ProtectedRoute>} />

        <Route path="/doctors/profile/me"
            element={
                <ProtectedRoute allowedRoles={['doctor']}>
                    <Dashboard />
                </ProtectedRoute>} />

        {/* <Route path="/admin-dashboard"
            element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                </ProtectedRoute>} /> */}



    </Routes>


}

export default Routers