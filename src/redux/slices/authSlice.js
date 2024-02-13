import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../../config/axiosInstance.js'
const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn") ||false ,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {}
}

export const createAccount = createAsyncThunk('/auth/signup',async(data)=>{
    try {
        const response = axiosInstance.post("user/register",data);
        toast.promise(response,{
            loading: 'wait creating your account',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to create account'
        });
        return await response;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{}
});

export default authSlice.reducer;
