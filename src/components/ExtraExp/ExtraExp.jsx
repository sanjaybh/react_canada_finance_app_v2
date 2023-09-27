import { formSubmitHandler, post } from "../../helper/Auth";
import { useContext, useEffect, useState } from 'react'

import ExtraExpTable from "./ExtraExpTable";
import Info from '../Info/Info';
import Login from '../Login/Login';
import UserContext from '../../context/UserContext'

export default function ExtraExp() {
    const [loading, setLoading ] = useState(false);
    const [resMessage, setResMessage] = useState({});
    const [reqType, setReqType] = useState("NEW_REQUEST");
    const [tableData, setTableData] = useState([]);
    const [formData, setFormData] = useState({
        item:0, price:0, type:"ONETIME" //ONETIME/EXTRAEXP
    })

    const { loggedIn, loggedInUser } = useContext(UserContext);

    if(!loggedIn) {<Login />}
    
    const BASE_URL = import.meta.env.VITE_REACT_APP_URL;
    const endpoint = "getAllExp"    

    useEffect(()=>{
        const dummyUsr = formData;
        dummyUsr["accessToken"] = loggedInUser?.accessToken
        setLoading(true)
        post( `${BASE_URL}/extraExp/${endpoint}`, dummyUsr)
        .then( response => {
            if(response.success === true || response.success === "true"){
                setResMessage(response)
                if(response.data == null || response.data.length <=0 ){
                    setFormData(formData)
                }else{
                    setFormData(response.data[0])
                    setTableData(response.data)
                }
                //Fill Table Data
                setReqType("UPDATE_REQUEST")
            }else{
                setResMessage(response)
                setReqType("NEW_REQUEST")
            }
            setLoading(false)
        })
    },[])

    const handleChange = function(event){ 
        //console.log(event.target.name, event.target.value)
        
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}))
    }
    const handleUserSubmit = async function(event){
        event.preventDefault();
        //console.log("formData - " + formData)
        
        const userTaxForm = formSubmitHandler(event)
        userTaxForm["accessToken"] = loggedInUser?.accessToken
        
        let endpoint;
        if(reqType == "NEW_REQUEST"){
            endpoint = "create"
        }else if(reqType == "UPDATE_REQUEST"){
            endpoint = "update"
            userTaxForm["_id"] = formData["_id"]
        }

        setLoading(true)
        await post( `${BASE_URL}/extraExp/${endpoint}`, userTaxForm)
        .then( response => {
            if(response.success === true || response.success === "true"){
                setResMessage(response)
                setLoading(false)

                setTableData(response.data)
                // if(response.data == null || response.data.length <=0 ){
                //     setFormData(formData)
                // }else{
                //     setFormData(response.data[0])
                //     setTableData(response.data)
                // }
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
                    <Info title="Extra Expenses (Overall)"/>
                        
                        <form className="p-6 flex flex-col justify-center" onSubmit={handleUserSubmit}>
                            {loading && <div className="text-green-700 font-bold">loading...</div>}
                            {resMessage ? <div className="text-red-700 font-bold">{resMessage.message}</div> : ""}
                            <div className="flex flex-col">
                                <label htmlFor="item" className="show">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    name="item"
                                    id="item"
                                    onChange={handleChange}
                                    value={formData.item}
                                    required
                                    placeholder="Item Name"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="price" className="show">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    required
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Price (CAD)"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="type" className="show">
                                    Item Type
                                </label>
                                <select
                                    name="type"
                                    id="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    placeholder="Item Type"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                >
                                    <option value="ONETIME">One Time</option>
                                    <option value="EXTRAEXP">Extra Expenses</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    {tableData.length >=0 ? <ExtraExpTable formData={formData} setFormData={setFormData} loadData={tableData} /> : "No Records found"}
                    
                </div>
            </div>
        </div>
    );
}