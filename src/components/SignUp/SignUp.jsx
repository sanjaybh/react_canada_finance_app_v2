import Info from "../Info/Info"

export default function SignUp() {
    const handleSubmit = function(event){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const user = {}
        for (let entry of formData.entries()) {
            user[entry[0]] = entry[1]
        }
        console.log(user)
    }
    
    const main_className = "w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none";
    return (
        <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Info title="Sign Up"/>
                        <form className="p-6 flex flex-col justify-center" onSubmit={handleSubmit}>
                            
                            <div className="flex flex-col">
                                <label htmlFor="name" className="hidden">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
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
                                    id="email"
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
                                    required
                                    minLength={6}
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
                                    name="tel"
                                    required
                                    id="tel"
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
                                    required
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