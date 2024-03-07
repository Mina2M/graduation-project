
import React, { useContext, useState } from 'react'
import { BASE_URL } from '../config';
import { authContext } from '../context/AuthContext';

const Contact = () => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [messageText, setMessageText] = useState("");
    const { token } = useContext(authContext)


    const handleSubmitMessage = async e => {
        e.preventDefault()

        // here we use api 
        try {
            console.log('mina')
            // console.log(token)
            const res = await fetch(`${BASE_URL}/messages/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ email, subject, messageText })
            })

            const result = await res.json()
            console.log("Contact", result)
            if (!res.ok) alert(result.message);
            alert("message submitted")
        } catch (err) {
            alert(err.message)
        }
    }

    return <section>
        <div className="px-4 mx-auto max-w-screen-md">
            <h2 className="heading text-center">Contact Us</h2>
            <p className="mb-8 lg:mb-16 font-light text-center text_para">
                Got a technical issue? want to send feedback about a beta feature? Let us know.
            </p>
            <form action="#" className='space-y-8'>
                <div>
                    <label htmlFor="email" className='form__label'>Your Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='example@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                        className='form__input mt-1' />
                </div>

                <div>
                    <label htmlFor="subject" className='form__label'>Subject</label>
                    <input
                        type="text"
                        id="subject"
                        placeholder='Let us know how we can help you'
                        onChange={(e) => setSubject(e.target.value)}
                        className='form__input mt-1' />
                </div>

                <div className='sm:col-span-2'>
                    <label htmlFor="message" className='form__label'>Your Message</label>
                    <textarea
                        rows='6 '
                        type="text"
                        id="message"
                        placeholder='Leave a comment...'
                        onChange={(e) => setMessageText(e.target.value)}
                        className='form__input mt-1' />
                </div>

                <button type='submit' onClick={handleSubmitMessage} className='btn rounded sm:w-fit '>Submit</button>
            </form>
        </div>
    </section>
}

export default Contact