import React from 'react'
import { formateDate } from "../../utils/formateDate";
import starIcon from '../../assets/images/Star.png'

const Overview = (doctor) => {
    console.log('***hh')
    // console.log(doctor.user.qualifications);
    return <div >
        <div className="grid md:grid-cols-1 gap-[50px]">
            <div className="flex items-center gap-5">
                <figure className='max-w-[200px] h-[220px] '>
                    <img src={doctor.user.photo} alt="" className='w-full' />
                </figure>

                <div>
                    <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-4 lg:px-6 text-[12px]
                            leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded mt-20">
                        {doctor.user.specialization}
                    </span>
                    <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold'>{doctor.user.name}</h3>
                    <div className="flex items-center gap-[6px]">
                        <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                            <img src={starIcon} alt="" /> {doctor.user.averageRating}
                        </span>
                        <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>{doctor.user.totalRating}</span>
                    </div>

                    <p className="text_para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">{doctor.user.bio}</p>
                </div>
            </div>
        </div>


        <div>
            <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
                About of
                <span className="text-irisBlueColor font-bold text-[24px] leading-9">{doctor.user.name}</span>
            </h3>
            <p className="text_para">{doctor.user.about}</p>
        </div>

        <div className="mt-12">
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                Education
            </h3>

            <ul className='pt-4 md:p-5'>

                {doctor.user.qualifications?.map((q, idx) => (
                    <div key={idx}>
                        <li className="flex flex-col justify-between sm:flex-row sm:justify-betweem sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{formateDate(q.sDate)} - {formateDate(q.eDate)}</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">{q.position}</p>
                            </div>
                            <p className="text-[16px] leading-5 font-medium text-textColor">{q.university}</p>
                        </li>
                    </div>
                ))}

            </ul>
        </div>

        <div className="mt-12">
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Experience</h3>

            <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
                {doctor.user.experiences?.map((q, idx) => (
                    <div key={idx}>
                        <li className="p-4 rounded bg-[#0066ff2c]">
                            <span className="text-sky-700 text-[15px] leading-6 font-semibold">
                                {formateDate(q.sDate)} - {formateDate(q.eDate)}
                            </span>
                            <p className="text-[16px] leading-6 font-medium text-textColor">
                                {q.position}
                            </p>
                            <p className="text-[14px] leading-5 font-medium text-textColor">{q.university}</p>

                        </li>
                    </div>
                ))}

            </ul>

        </div>
    </div>
}

export default Overview