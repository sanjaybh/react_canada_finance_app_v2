import { formSubmitHandler, post } from "../../helper/Auth";
import {useContext, useState} from 'react';
import { useEffect, useRef } from "react";

import Info from "../Info/Info"
import UserContext from "../../context/UserContext";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [resMessage, setResMessage] = useState({});    
    const [formMode, setFormMode] = useState("CREATE_FORM")
    const [inputs, setInputs] = useState({});
    const { loggedIn, setLoggedIn, loggedInUser, setLoggedInUser } = useContext(UserContext);

    //Form References - Form Ref :- TODO - need to be changed
    const inputNameRef = useRef(null)
    const inputEmailRef = useRef(null)
    const inputPasswordRef = useRef(null)
    
    useEffect(()=>{
        //inputNameRef.current.focus();
        
        if(loggedIn){ 
            setInputs(loggedInUser)

            //Disable Email and Password, and dont send back for update
            inputEmailRef.current.disabled = true
            inputPasswordRef.current.disabled = true

            setFormMode("UPDATE_FORM")
        }
    }, [])

    const handleChange = (event) => { 
        const name = event.target.name;
        const value = event.target.value;
        let objV;
        setInputs(values => {
            objV = {...values}
            if(name =="city" || name == "country"){
                objV.address[name] = value
            }else{
                objV[name] = value
            }
            values = objV;
            return {...values}
        })
        //setInputs(values => ({...values, [name]: value}))
      }

    const handleUserSubmit = async function(event){
        event.preventDefault();
        const BASE_URL = import.meta.env.VITE_REACT_APP_URL;
        const user = formSubmitHandler(event)

        const address = {"city": user.city, "country": user.country}
        user.address = address;
        delete user.city;
        delete user.country;
        console.log("User - "+JSON.stringify(user))
        if(user){
            setLoading(true)
            let endpoint = "CREATE_FORM"
            //CREATE_FORM, UPDATE_FORM
            if(formMode == "CREATE_FORM"){
                endpoint = "addUser"
            }else{
                delete user.email
                delete user.password
                //setLoggedInUser(inputs)
                //Setting up token with the user
                user["accessToken"] = loggedInUser.accessToken
                endpoint = "updateUser"
            }
            setLoading(true)
            //Get User authenticated
            await post( `${BASE_URL}/MasterEntry/${endpoint}`, user)
            .then( response => {
                if(response.success === true || response.success === "true"){
                    setResMessage(response)
                }else{
                    setResMessage(response)
                }
                setLoading(false)
            })
        }
    }

    const main_className = "w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none";
    return (
        <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Info title="Sign Up"/>
                        <form id="signUpForm" className="p-6 flex flex-col justify-center" onSubmit={handleUserSubmit}>
                            {loading && <div className="text-green-700 font-bold">loading...</div>}
                            {resMessage ? <div className="text-red-700 font-bold">{resMessage.message}</div> : ""}

                            <div className="flex flex-col">
                                <label htmlFor="name" className="hidden">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name" 
                                    id="name"
                                    onChange={handleChange}
                                    value={inputs?.name || ""} 
                                    ref={inputNameRef}
                                    minLength={3}
                                    required
                                    placeholder="Full Name"
                                    className={main_className}
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="email" className="hidden">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    onChange={handleChange}
                                    value={inputs?.email || ""} 
                                    id="email"
                                    ref={inputEmailRef}
                                    placeholder="Email"
                                    className={main_className}
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="password" className="hidden">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    value={inputs?.password || "*******"} 
                                    name="password"
                                    required
                                    minLength={6}
                                    ref={inputPasswordRef}
                                    id="password"
                                    placeholder="Password"
                                    className={main_className}
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="tel" className="hidden">
                                    Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={inputs?.phone || ""} 
                                    onChange={handleChange}
                                    required
                                    id="phone"
                                    placeholder="Telephone Number"
                                    className={main_className}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="city" className="hidden">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    onChange={handleChange}
                                    value={inputs?.address?.city || ""} 
                                    required
                                    placeholder="City"
                                    className={main_className}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="country" className="hidden">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={inputs?.address?.country || ""} 
                                    required
                                    onChange={handleChange}
                                    id="country"
                                    placeholder="Country"
                                    className={main_className}
                                />
                            </div>

                            <button
                                type="submit"
                                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg 
                                mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
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