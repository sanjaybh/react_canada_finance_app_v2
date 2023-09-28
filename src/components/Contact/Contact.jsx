import { formSubmitHandler, post, resetFormElements } from '../../helper/Auth';

import Info from '../Info/Info';
import { useState } from 'react';

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [resMessage, setResMessage] = useState({});
    const [formData, setFormData] = useState({
        "name": "", "email": "", "tel": '', "comments": ""
    })

    const BASE_URL = import.meta.env.VITE_REACT_APP_URL;

    const resetFormFields = () => {
        setFormData(resetFormElements('contactUs_form'))
    }

    const handleChange = function(event){
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();        
        const formData = formSubmitHandler(e)
        //console.log("Submit form - "+formData)
        setLoading(true)
        await post( `${BASE_URL}/contact/contact`, formData)
        .then( response => {
            if(response.success === true || response.success === "true"){
                setError(true)
                setResMessage(response.message)
            }else{
                setError(true)
                setResMessage(response.message)
            }
            setLoading(false)
            resetFormFields();
        })
    }
    
    return (
        <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Info title="Contact Us" />
                        <form id="contactUs_form" className="p-6 flex flex-col justify-center" onSubmit={handleFormSubmit}>
                            {!error ? "": <div className="text-green-700 font-bold">{resMessage} </div>}
                            {loading ? <div className="text-green-700 font-bold">loading...</div> : "" }
                            <div className="flex flex-col">
                                <label htmlFor="name" className="show">
                                    Full Name
                                </label>
                                <input
                                    type="name"
                                    name="name"
                                    onChange={handleChange}
                                    value={formData.name}
                                    required
                                    id="name"
                                    placeholder="Full Name"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="email" className="show">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    onChange={handleChange}
                                    name="email"
                                    value={formData.email}
                                    required
                                    id="email"
                                    placeholder="Email"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="tel" className="show">
                                    Number
                                </label>
                                <input
                                    type="tel"
                                    onChange={handleChange}
                                    name="tel"
                                    value={formData.tel}
                                    required
                                    id="tel"
                                    placeholder="Telephone Number"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="comments" className="show">
                                    Reason / Comments
                                </label>
                                <textarea
                                    type="textarea"
                                    name="comments"
                                    onChange={handleChange}
                                    value={formData.comments}
                                    required
                                    maxLength={250}
                                    id="comments"
                                    rows="4" 
                                    wrap="off"
                                    cols="50"
                                    placeholder="Comments / Reason"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}