import React from 'react';
import med_icon from '../Images/corumed_med_logo.png';

const Login = () => {
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
            <div className="w-full p-6 m-auto  rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-blue-600 lg:max-w-xl ">
            <section class="hero container max-w-screen-lg mx-auto pb-10 flex">
                <img class="w-32 mx-auto" src={med_icon} alt="screenshot" />
            </section>
                
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 ring ring-1 ring-blue-600 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2  ring ring-2 ring-blue-600 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
            
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;