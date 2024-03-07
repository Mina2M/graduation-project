import React, { useEffect, useState, useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'
import Loading from '../../components/Loader/Loading';

const Profile = (doctor) => {

    const [qualifications, setQualifications] = useState([{ sDate: "", eDate: "", position: "", university: "" }]);
    const [experiences, setExperiences] = useState([{ sDate: "", eDate: "", position: "", university: "" }]);

    const [timeSlots, setTimeSlots] = useState([{ day: "", sTime: "", eTime: "" }]);

    const { token } = useContext(authContext)

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            phone: '',
            bio: '',
            gender: '',
            specialization: '',
            ticketPrice: '',
            qualifications: [],
            experiences: [],


        }
    )
    console.log(doctor.user._id)
    console.log('***h')
    const navigate = useNavigate()



    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleQualificationChange = (e, i) => {
        const field = e.target.name;
        const newQualifications = [...qualifications];
        newQualifications[i][field] = e.target.value;
        formData.qualifications = newQualifications;
        console.log('todo')
        console.log(newQualifications[i]);
        console.log(formData.qualifications[i]);

        setQualifications(newQualifications);
    };

    const handleAddQualification = () => {
        setQualifications([...qualifications, { sDate: "", eDate: "", position: "", university: "" }]);
    };

    const handleDeleteQualification = (i) => {
        const newQualifications = [...qualifications];
        newQualifications.splice(i, 1);
        setQualifications(newQualifications);
    };

    //experience

    const handleExperiencesChange = (e, i) => {
        const field = e.target.name;
        const newExperiences = [...experiences];
        newExperiences[i][field] = e.target.value;
        formData.experiences = newExperiences;
        console.log('todo')
        console.log(newExperiences[i]);

        setExperiences(newExperiences);
    };

    const handleAddExperiences = () => {
        setExperiences([...experiences, { sDate: "", eDate: "", position: "", university: "" }]);
    };

    const handleDeleteExperiences = (i) => {
        const newExperiences = [...experiences];
        newExperiences.splice(i, 1);
        setExperiences(newExperiences);
    };

    // timeSlots

    const handleTimeSlotsChange = (e, i) => {
        const field = e.target.name;
        const newTimeSlots = [...timeSlots];
        newTimeSlots[i][field] = e.target.value;
        formData.timeSlots = newTimeSlots;
        console.log('todo')
        console.log(newTimeSlots[i]);


        setTimeSlots(newTimeSlots);
    };

    const handleAddtimeSlots = () => {
        setTimeSlots([...timeSlots, { day: "", sTime: "", eTime: "" }]);
    };

    const handleDeleteTimeSlots = (i) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots.splice(i, 1);
        setQualifications(newTimeSlots);
    };


    const submitHandler = async event => {


        // setTodos([]);
        console.log(formData)
        event.preventDefault();
        setLoading(true)

        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctor.user._id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            })

            const { message } = await res.json()

            if (!res.ok) {
                throw new Error(message)
            }

            setLoading(false)
            toast.success(message)
            navigate('/doctors/profile/me')

        } catch (err) {
            toast.error(err.message)
            setLoading(false)
        }
    }

    return <section>
        <div className="px-4 mx-auto max-w-screen-md">
            <form onSubmit={submitHandler} className='space-y-8'>
                <div>
                    <label htmlFor="subject" className='form__label'>Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder='name'
                        className='form__input mt-1' />
                </div>

                <div>
                    <label htmlFor="email" className='form__label'>Email*</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='example@gmail.com'
                        className='form__input mt-1' />
                </div>

                <div>
                    <label htmlFor="phone" className='form__label'>Phone*</label>
                    <input
                        type="number"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='015'
                        className='form__input mt-1' />
                </div>

                <div>
                    <label htmlFor="bio" className='form__label'>Bio*</label>
                    <input
                        type="text"
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder='Bio'
                        className='form__input mt-1' />
                </div>

                <div className="mb-5 flex items-center justify-between space-x-8">
                    <div>
                        <label htmlFor="gender" className='form__label outline-none'>Gender*
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 w-[200px]'>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="specialization" className='form__label outline-none'>Specialization*
                            <select
                                id="specialization"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 w-[200px]'>
                                <option value="">Select</option>
                                <option value="Cancer Care">Cancer Care</option>
                                <option value="Heart & Vascular">Heart & Vascular</option>
                                <option value="Neurology">Neurology</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="ticketPrice" className='form__label w-full'>Ticket Price*</label>
                        <input
                            type="number"
                            id="ticketPrice"
                            name="ticketPrice"
                            value={formData.ticketPrice}
                            onChange={handleInputChange}
                            placeholder='0'
                            className='form__input mt-1 first-letter:' />
                    </div>

                </div>

                <button className='bg-green-400 text-white font-normal p-2 mr-5 px-5 rounded-md  text-[16px] leading-7' onClick={handleAddQualification}>AddQualification</button>
                {qualifications.map((qualification, index) => (
                    <div key={index}>
                        <div className="mb-5 flex items-center justify-between space-x-8">
                            <div>
                                <label htmlFor="sDate" className='form__label'>Starting time*</label>
                                <input
                                    type="date"
                                    id="sDate"
                                    name="sDate"
                                    value={qualification.sDate}
                                    onChange={(e) => handleQualificationChange(e, index)}
                                    required
                                    className='form__input mt-1' />
                            </div>

                            <div>
                                <label htmlFor="eDate" className='form__label'>Ending time*</label>
                                <input
                                    type="date"
                                    id="eDate"
                                    name="eDate"
                                    value={qualification.eDate}
                                    onChange={(e) => handleQualificationChange(e, index)}
                                    required
                                    className='form__input mt-1' />
                            </div>
                        </div>

                        <div className="mb-5 flex items-center justify-between space-x-8">
                            <div>
                                <label htmlFor="postion" className='form__label'>Position*</label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    value={qualification.position}
                                    onChange={(e) => handleQualificationChange(e, index)}
                                    required
                                    className='form__input mt-1' />
                            </div>

                            <div>
                                <label htmlFor="university" className='form__label'>University*</label>
                                <input
                                    type="text"
                                    id="university"
                                    name="university"
                                    value={qualification.university}
                                    onChange={(e) => handleQualificationChange(e, index)}
                                    required
                                    className='form__input mt-1' />
                            </div>
                        </div>

                        <button onClick={() => handleDeleteQualification(index)}>Delete</button>
                    </div>
                ))}

                {/* experience */}
                <button className='bg-green-400 text-white font-normal p-2 mr-5 px-5 rounded-md  text-[16px] leading-7' onClick={handleAddExperiences}>AddExperience</button>
                {experiences.map((experience, index) => (
                    <div key={index}>
                        <div className="mb-5 flex items-center justify-between space-x-8">
                            <div>
                                <label htmlFor="sDate" className='form__label'>Starting time*</label>
                                <input
                                    type="date"
                                    id="sDate"
                                    name="sDate"
                                    value={experience.sDate}
                                    onChange={(e) => handleExperiencesChange(e, index)}
                                    required
                                    className='form__input mt-1' />
                            </div>

                            <div>
                                <label htmlFor="eDate" className='form__label'>Ending time*</label>
                                <input
                                    type="date"
                                    id="eDate"
                                    name="eDate"
                                    value={experiences.eDate}
                                    onChange={(e) => handleExperiencesChange(e, index)}
                                    required
                                    className='form__input mt-1' />
                            </div>
                        </div>

                        <div className="mb-5 flex items-center justify-between space-x-8">
                            <div>
                                <label htmlFor="postion" className='form__label'>Position*</label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    value={experiences.position}
                                    onChange={(e) => handleExperiencesChange(e, index)}
                                    required
                                    className='form__input mt-1' />
                            </div>

                            <div>
                                <label htmlFor="university" className='form__label'>University*</label>
                                <input
                                    type="text"
                                    id="university"
                                    name="university"
                                    value={experience.university}
                                    onChange={(e) => handleExperiencesChange(e, index)}
                                    required
                                    className='form__input mt-1' />
                            </div>
                        </div>

                        <button onClick={() => handleDeleteExperiences(index)}>Delete</button>
                    </div>
                ))}

                {/* timeSlots */}
                <button className='bg-green-400 text-white font-normal p-2 mr-5 px-5 rounded-md  text-[16px] leading-7' onClick={handleAddtimeSlots}>Add TimeSlot</button>
                {timeSlots.map((timeSlot, index) => (
                    <div key={index}>
                        <div className="mb-5 flex items-center justify-between space-x-8">

                            <div>
                                <label htmlFor="day" className='form__label outline-none'>Day*
                                    <select
                                        id="day"
                                        name="day"
                                        value={timeSlot.day}
                                        onChange={(e) => handleTimeSlotsChange(e, index)}
                                        required
                                        className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 w-[200px]'>
                                        <option value="">Select</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                    </select>
                                </label>
                            </div>

                            <div>
                                <label htmlFor="sTime" className='form__label w-full'>Starting Time*</label>
                                <input
                                    type="time"
                                    id="sTime"
                                    name="sTime"
                                    value={timeSlot.sTime}
                                    onChange={(e) => handleTimeSlotsChange(e, index)}
                                    required className='form__input mt-1 first-letter:' />
                            </div>

                            <div>
                                <label htmlFor="eTime" className='form__label w-full'>Ending Time*</label>
                                <input
                                    type="time"
                                    id="eTime"
                                    name="eTime"
                                    value={timeSlot.eTime}
                                    onChange={(e) => handleTimeSlotsChange(e, index)}
                                    required className='form__input mt-1 first-letter:' />
                            </div>



                        </div>



                        <button onClick={() => handleDeleteTimeSlots(index)}>Delete</button>
                    </div>
                ))}
                {/*  */}





                <button type='submit' className='btn bg-blue-500 rounded sm:w-fit '>Submit</button>
            </form>
        </div>

    </section>
}

export default Profile