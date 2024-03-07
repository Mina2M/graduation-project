import React, { useState } from 'react'
import avatar from '../../assets/images/avatar-icon.png'
import { formateDate } from '../../utils/formateDate'
import { AiFillStar } from 'react-icons/ai'
import FeedbackForm from '../Doctors/FeedbackForm'
import { useParams } from 'react-router-dom'
import { useGetReviews } from '../../hooks/useGetReview'

const Feedback = () => {
    const { id } = useParams();

    const reviews = useGetReviews(id);
    // console.log('Mina', reviews[0].user.name)







    const [showFeedbackForm, setShowFeedbackForm] = useState(false)

    return <div>

        <div className="mb-[50px]"  >

            <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>All reviews ({reviews.length})</h4>
            {reviews.map((r, idx) => (
                <div className="flex justify-between gap-10 mb-[30px]" key={idx}>
                    <div className="flex gap-3">
                        <figure className='w-10 h-10 rounded-full '>
                            <img className='w-full' src={avatar} alt="" />
                        </figure>
                        <div>

                            {/* reviews.map((r) => ( */}
                            {/* console.log('mina', r.user.name) */}
                            {/* )) */}
                            <h5 className="text-[16px] leading-6 text-primaryColor font-bold">{r.user.name}</h5>

                            <p className="text-[14px] leading-6 text-textColor">{formateDate(r.createdAt)}</p>

                            <p className="text_para mt-3 font-medium text-[15px]">{r.reviewText}</p>
                        </div>
                    </div>

                    <div className="flex gap-1">
                        {[...Array(r.rating).keys()].map((_, index) => <AiFillStar key={index} color='#0067FF' />)}
                        {/* <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'><img src={starIcon} alt="" />{avgRating}</span> */}

                    </div>

                </div>
            ))}
        </div>


        {!showFeedbackForm && <div className="text-center">
            <button className="btn" onClick={() => setShowFeedbackForm(true)}>Give Feedback</button>
        </div>}

        {showFeedbackForm && <FeedbackForm />}

    </div>

}

export default Feedback