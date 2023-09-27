import { formSubmitHandler, post } from "../../helper/Auth";
import { useContext, useEffect, useState } from 'react'

import Info from '../Info/Info';
import Login from '../Login/Login';
import UserContext from '../../context/UserContext'

export default function RentExpenses() {
    const [loading, setLoading ] = useState(false);
    const [resMessage, setResMessage] = useState({});
    const [reqType, setReqType] = useState("NEW_REQUEST");
    const [formData, setFormData] = useState({
        "roomRent": 0, "hydro": 0, "water": 0, "electricity": 0, "wifi": 0, "laundry": 0
    })

    const { loggedIn, loggedInUser } = useContext(UserContext);

    if(!loggedIn) {<Login />}
    
    const BASE_URL = import.meta.env.VITE_REACT_APP_URL;
    const endpoint = "getRentExpenses"
    

    useEffect(()=>{
        const dummyUsr = formData;
        dummyUsr["accessToken"] = loggedInUser?.accessToken
        setLoading(true)
        post( `${BASE_URL}/RentExpenses/${endpoint}`, dummyUsr)
        .then( response => {
            if(response.success === true || response.success === "true"){
                setResMessage(response)
                if(response.data == null || response.data.length <=0 ){
                    setFormData(formData)
                }else{
                    setFormData(response.data)
                }
                setReqType("UPDATE_REQUEST")
            }else{
                setResMessage(response)
                setFormData(formData)
                setReqType("NEW_REQUEST")
            }
            setLoading(false)
        })
    },[])

    const handleChange = function(event){
        const name = event.target.name;
        const value = event.target.value;
        //console.log(name, value)
        setFormData(values => ({...values, [name]: value}))
    }

    const handleUserSubmit = async function(event){
        event.preventDefault();
        console.log("formData - " + formData)
        
        const userTaxForm = formSubmitHandler(event)
        userTaxForm["accessToken"] = loggedInUser?.accessToken
        
        let endpoint;
        if(reqType == "NEW_REQUEST"){
            endpoint = "addExpenses"
        }else if(reqType == "UPDATE_REQUEST"){
            endpoint = "updateExpenses"
        }

        setLoading(true)
        await post( `${BASE_URL}/RentExpenses/${endpoint}`, userTaxForm)
        .then( response => {
            if(response.success === true || response.success === "true"){
                setResMessage(response)
                setLoading(false)
            }else{
                setResMessage(response)
                setLoading(false)
            }
        })
    }
    
    return (
        <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                    <Info title="Rent Expenses/Month"/>
                        
                        <form className="p-6 flex flex-col justify-center" onSubmit={handleUserSubmit}>
                            {loading && <div className="text-green-700 font-bold">loading...</div>}
                            {resMessage ? <div className="text-red-700 font-bold">{resMessage.message}</div> : ""}
                            <div className="flex flex-col">
                                <label htmlFor="roomRent" className="show">
                                    Room Rent
                                </label>
                                <input
                                    type="number"
                                    name="roomRent"
                                    id="roomRent"
                                    onChange={handleChange}
                                    value={formData.roomRent}
                                    required
                                    placeholder="Tax Per Year in %"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="hydro" className="show">
                                    Hydro
                                </label>
                                <input
                                    type="number"
                                    name="hydro"
                                    id="hydro"
                                    required
                                    value={formData.hydro}
                                    onChange={handleChange}
                                    placeholder="Hydro Expenses"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="electricity" className="show">
                                    Electricity
                                </label>
                                <input
                                    type="number"
                                    name="electricity"
                                    id="electricity"
                                    value={formData.electricity}
                                    onChange={handleChange}
                                    required
                                    placeholder="Electricity Expenses"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="water" className="show">
                                    Water
                                </label>
                                <input
                                    type="number"
                                    name="water"
                                    id="water"
                                    value={formData.water}
                                    onChange={handleChange}
                                    required
                                    placeholder="Water Expenses"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="wifi" className="show">
                                    Wi-fi
                                </label>
                                <input
                                    type="number"
                                    name="wifi"
                                    id="wifi"
                                    value={formData.wifi}
                                    onChange={handleChange}
                                    required
                                    placeholder="Wi-fi Expenses"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="laundry" className="show">
                                    Laundry
                                </label>
                                <input
                                    type="number"
                                    name="laundry"
                                    id="laundry"
                                    value={formData.laundry}
                                    onChange={handleChange}
                                    required
                                    placeholder="Laundry Expenses"
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