import { formSubmitHandler, get } from '../../helper/Auth';
import {useContext, useState} from 'react';

import Info from "../Info/Info"
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("sanjay@gmail.com")
    const [password, setPassword] = useState("sanjay")
    const [updatedUser, setUpdatedUser] = useState()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const { loggedIn, setLoggedIn } = useContext(UserContext);
    
    const handleSubmit = async function(event){
        event.preventDefault();
        const user = formSubmitHandler(event)

        //Get User authenticated
        await get( 'https://weg8bz43zy.us.aircode.run/auth/login', user )
        .then( response => {
            setLoading(true)
            if(response.success === true){
                setUpdatedUser(response.data);
                setLoggedIn(true);
                navigate("/");
                setLoading(false);
                setError(false)
            }else{
                setUpdatedUser(response);
                setLoggedIn(false);
                setError(true);
                navigate("/login");
                setLoading(false)
            }
        })
    }
    const main_className = "w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none";

    return (
        <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Info title="Login" />
                        <form className="p-6 flex flex-col justify-center" onSubmit={handleSubmit}>
                            {!error ? "": <div className="text-red-700">Error: {updatedUser.message} </div> }
                            {loading && <div className="text-gray-700">loading...</div>}
                            
                            <div className="flex flex-col mt-2">
                                <label htmlFor="email" className="hidden">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
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
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    id="password"
                                    placeholder="Password"
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