import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../../config/axiosInstance.js'
import { json } from "react-router-dom";
const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn") ||false ,
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
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


export const login = createAsyncThunk('/auth/sigin',async(data)=>{
    try {
        const response = axiosInstance.post("user/login",data);
        toast.promise(response,{
            loading: 'wait authenticating you',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to authenticate you..!'
        });
        return await response;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
})

export const logout = createAsyncThunk('/auth/logout',async(data)=>{
    try {
        const response = axiosInstance.get("user/logout",data);
        toast.promise(response,{
            loading: 'wait logging out you',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to logging out you..!'
        });
        return await response;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
})



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        console.log("extraReducers");
        builder.addCase(login.fulfilled,(state, action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.data));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role", action?.payload?.data?.user?.role);
            state.isLoggedIn = true;
            state.role = action?.payload?.data?.user?.role;
            state.data = action?.payload?.data;
            console.log(action?.payload?.data);
            console.log(action?.payload?.data?.user?.role);
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.isLoggedIn = false;
            state.role = "";
            state.data = {};

        })
    }
});

export default authSlice.reducer;
