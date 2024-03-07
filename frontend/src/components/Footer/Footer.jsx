import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/consulting.png'
import { RiLinkedinFill } from 'react-icons/ri';
// import {AiFillToutube}

const quickLinks01 = [
    {
        path: "/home",
        display: "Home",
    },
    {
        path: "/",
        display: "About Us",
    },
    {
        path: "/services",
        display: "Services",
    },
    {
        path: "/",
        display: "Blog",
    },
];

const quickLinks02 = [
    {
        path: "/find-a-doctor",
        display: "Find a Doctor",
    },
    {
        path: "/",
        display: "Request an Appointment",
    },
    {
        path: "/",
        display: "Find a Location",
    },
    {
        path: "/",
        display: "Get a Opinion",
    },
];

const quickLinks03 = [
    {
        path: "/",
        display: "Offers",
    },
    {
        path: "/contact",
        display: "Contact Us",
    },
];

const Footer = () => {

    const year = new Date().getFullYear()
    return <footer className='pb-16 pt-10'>
        <div className="container">
            <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
                <div className='w-32 h-32'>
                    <img src={logo} alt="" />
                    <p className='text-[16px] leading-7 font-[400] text-textColor mt-4'>Copyright @{year}</p>

                </div>

                <div>
                    <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor '>Quick Links</h2>
                    <ul>
                        {quickLinks01.map((item, index) =>
                            <li key={index} className='mb-4'>
                                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor' >{item.display}</Link>
                            </li>
                        )}
                    </ul>
                </div>

                <div>
                    <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor '>I want to</h2>
                    <ul>
                        {quickLinks02.map((item, index) =>
                            <li key={index} className='mb-4'>
                                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor' >{item.display}</Link>
                            </li>
                        )}
                    </ul>
                </div>

                <div>
                    <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor '>Support</h2>
                    <ul>
                        {quickLinks03.map((item, index) =>
                            <li key={index} className='mb-4'>
                                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor' >{item.display}</Link>
                            </li>
                        )}
                    </ul>
                </div>

            </div>
        </div>
    </footer>
}

export default Footer