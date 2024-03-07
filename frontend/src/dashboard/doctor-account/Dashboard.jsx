import { useContext, useState } from 'react';
import { authContext } from '../../context/AuthContext';
import Profile from './Profile';

import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../config';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import Overview from './Overview';
import Appointments from './Appointments';
const Dashboard = () => {
    const { dispatch } = useContext(authContext)
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
    }

    const [tab, setTab] = useState('first')

    const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`)
    console.log('***')
    console.log(userData, 'userdata')
    // console.log(error)
    console.log('--------------------------------')

    return (
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>

                {loading && !error && <Loading />}

                {error && !loading && <Error errMessage={error} />}

                {!loading && !error && <div className="grid md:grid-cols-3 gap-1 bg-gray-100">

                    <div className="pb-[50px] px-[30px] rounded-m">
                        <div className='mt-[30px] '>
                            <div className='md:col-span-2 py-80px  bg-white'>
                                <button onClick={() => setTab('first')} className={`${tab === 'first' && 'bg-primaryColor text-white font-normal'} mr-5 px-5 font-semibold  w-full p-3 text-[16px] text-headingColor leading-7 rounded-md`}>Overview</button>

                                <button onClick={() => setTab('profile')} className={` ${tab === 'profile' && 'bg-primaryColor text-white font-normal'} mr-5 px-5 font-semibold  w-full p-3 text-[16px] text-headingColor leading-7 rounded-md`}>Profile</button>

                                <button onClick={() => setTab('appointment')} className={` ${tab === 'appointment' && 'bg-primaryColor text-white font-normal'} mr-5 px-5 font-semibold  w-full p-3 text-[16px] text-headingColor leading-7 rounded-md`}>Appointment</button>

                                <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 text-[16px] text-white leading-7 rounded-md'>Logout</button>

                            </div>
                        </div>

                    </div>

                    <div className="md:col-span-2 md:px-[30px]">

                        {
                            tab == 'first' && <Overview user={userData} />
                        }

                        {
                            tab == 'profile' && <Profile user={userData} />
                        }
                        {
                            tab == 'appointment' && <Appointments user={userData} />
                        }

                    </div>

                </div>
                }



            </div>
        </section>
    )
}

export default Dashboard