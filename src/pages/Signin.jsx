import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { toast } from "react-hot-toast"

import HomeLayout from '../layouts/HomeLayout'
import { Link } from "react-router-dom";
import { isEmail  } from "../helpers/regexMatcher.js"
import { login } from "../redux/slices/authSlice.js";
import { useDispatch } from "react-redux";

function Signin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signinDetails, setsigninDetails] = useState({
        email:'',
        fullName:'',
    });

    async function  onFormSubmit(e) {
        e.preventDefault();
        if(!signinDetails.email || !signinDetails.password) {
            toast.error("Please fill all the details");
            return;
        }
        if(!isEmail(signinDetails.email)) {
            toast.error("Email is inValid");
            return;
        }

        const response = await dispatch(login(signinDetails));
        if(response?.payload?.data) {
            navigate("/")
        }
        setsigninDetails({
            email:'',
            fullName:'',
        });
    }

    function inputHandler(e) {
        const {name , value } = e.target;
        setsigninDetails({
            ...signinDetails,
            [name]: value
        })
    }

    return(
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form
                onSubmit={onFormSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white">
                    <h1 className="text-3xl text-center font-bold">Login Page</h1>
                     <div className="flex flex-col gap-1">
                          <label htmlFor="email" className="font-semibold">Email</label>
                          <input
                            onChange={inputHandler} 
                            value={signinDetails.email} 
                            type="email"
                            name="email"
                            id="email"
                            className="bg-transparent px-2 py-1 border rounded-md"
                            placeholder="enter your Email..."
                          />
                     </div>
                     <div className="flex flex-col gap-1">
                          <label htmlFor="password" className="font-semibold">Password</label>
                          <input
                            onChange={inputHandler} 
                            value={signinDetails.password} 
                            type="password"
                            name="password"
                            id="password"
                            className="bg-transparent px-2 py-1 border rounded-md"
                            placeholder="enter your Password..."
                          />
                     </div>
                     <button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg rounded-md">
                            Signin
                     </button>
                     <p className="text-center">
                            Not have an account ? <Link to='/signup' className="cursor-pointer text-accent">Signup</Link>
                     </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Signin;