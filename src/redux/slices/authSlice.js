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

export const updateProfile = createAsyncThunk('/auth/updateProfile',async(data)=>{
    try {
        const response = axiosInstance.put(`user/update`,data);
        toast.promise(response,{
            loading: 'wait updating your profile',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to update profile'
        });
        return (await response).data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
})

export const fetchProfile = createAsyncThunk('/auth/fetchProfile',async(data)=>{
    try {
        const response = axiosInstance.get("user/me");

        return await response;
    } catch (e) {
        toast.error(e?.message);
    }
})



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(login.fulfilled,(state, action)=>{
            console.log("Login data : -",action?.payload?.data);
            localStorage.setItem("data",JSON.stringify(action?.payload?.data));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role", action?.payload?.data?.user?.role);
            state.isLoggedIn = true;
            state.role = action?.payload?.data?.user?.role;
            state.data = action?.payload?.data;
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.isLoggedIn = false;
            state.role = "";
            state.data = {};

        })
        .addCase(fetchProfile.fulfilled,(state,action)=>{
            if(action?.payload?.data){
                localStorage.setItem("data",JSON.stringify(action?.payload?.data));
                localStorage.setItem("isLoggedIn",true);
                localStorage.setItem("role", action?.payload?.data?.user?.role);
                state.data = action?.payload?.data?.user;
                state.isLoggedIn = true;
                state.role = action?.payload?.data?.user?.role;
            }
        })
    }
});

export default authSlice.reducer;
