import React, { useState, useContext } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { authContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../config';

const FeedbackForm = () => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const { id } = useParams();
    const { token } = useContext(authContext)
    const handleSubmitReview = async e => {
        e.preventDefault()

        // here we use api 
        try {
            console.log('mina')
            console.log(id)
            console.log(token)
            const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ reviewText })
            })

            const result = await res.json()
            if (!res.ok) alert(result.message);
            alert("review submitted")
        } catch (err) {
            alert(err.message)
        }
    }

    return <form action="">
        <div>
            <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">How would you rate the overall experience?*</h3>

            <div>
                {[...Array(5).keys()].map((_, index) => {
                    index += 1

                    return <button
                        key={index}
                        type="button"
                        className={`${index <= ((rating && hover) || hover)
                            ? "text-yellowColor"
                            : "text-gray-400"
                            } bg-transparent border-none outline-none text-[22px cursor-pointer] `}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                        onDoubleClick={() => {
                            setHover(0);
                            setRating(0);
                        }}
                    >
                        <span>
                            <AiFillStar />
                        </span>
                    </button>
                })}
            </div>
        </div>

        <div className="mt-[30px]">
            <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">Share your feedback or suggestions*</h3>

            <textarea className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md'
                rows="5"
                placeholder='Write your message'
                onChange={(e) => setReviewText(e.target.value)}
            >
            </textarea>
        </div>

        <button type='submit' onClick={handleSubmitReview} className='btn'>Submit Feedback</button>

    </form>

}

export default FeedbackForm