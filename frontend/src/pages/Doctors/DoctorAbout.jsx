import React from 'react'
import { formateDate } from "../../utils/formateDate";
import { useGetDoctor } from '../../hooks/useGetDoctor'
import { useParams } from 'react-router-dom'

const DoctorAbout = () => {

    const { id } = useParams();

    const doctor = useGetDoctor(id);
    console.log('look with me')
    console.log(doctor.qualifications)
    return <div>
        <div>
            <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
                About of
                <span className="text-irisBlueColor font-bold text-[24px] leading-9">{doctor.name}</span>
            </h3>
            <p className="text_para">{doctor.about}</p>
        </div>

        <div className="mt-12">
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Education</h3>

            <ul className='pt-4 md:p-5'>

                {doctor.qualifications?.map((q, idx) => (
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
                {doctor.experiences?.map((q, idx) => (
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

export default DoctorAbout