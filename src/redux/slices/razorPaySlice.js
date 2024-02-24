import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPyaments:{},
    finalMonths:{},
    monthlySalesRecord:[]
};


export const getRazorPayId = createAsyncThunk("/razorPay/getId" , async () => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data;
    } catch (error){
        toast.error(error?.data?.message);
    }
});

export const purchaseCourseBundel = createAsyncThunk("/purchaseCourse" , async () => {
    try {
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch (error){
        toast.error(error?.data?.message);
    }
});

export const verifyUserPayment = createAsyncThunk("/payments/record" , async (data) => {
    try {
        const response = await axiosInstance.get("/payments/?count=100");
        toast.promise(response,{
            loading: "Getting the paykment record...",
            success: (data)=>{
                return data?.data?.message;
            },
            error: "Failed to get the payment record."
        
        })
        return response.data;
    } catch (error){
        toast.error("Operation failed. Please try again.");
    }
});

export const cancelCourseBundle = createAsyncThunk("/payments/unsubscribe" , async (data) => {
    try {
        const response = await axiosInstance.get("/payments/unsubscribe");
        toast.promise(response,{
            loading: "Unsubscribing the Bundel...",
            success: (data)=>{
                return data?.data?.message;
            },
            error: "Failed to unsubscribe the bundel..."
        
        })
        return response.data;
    } catch (error){
        toast.error(error?.response?.data?.message);
    }
});

export const getPaymentRecord = createAsyncThunk("/payments/record" , async () => {
    try {
        const response = await axiosInstance.get("/payments/verify",{
            razorpay_payment_id : data.razorpay_payment_id,
            razorpaySubscription_id : data.razorpaySubscription_id,
            razorpay_signature: data.razorpay_signature
        });
        return response.data;
    } catch (error){
        toast.error(error?.data?.message);
    }
});

const razorPaySlice = createSlice({
    name: "razorPay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorPayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundel.fulfilled, (state, action) => {
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) => {
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected, (state, action) => { 
            toast.error(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled, (state, action) => {
            state.allPyaments = action?.payload?.allPyaments;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })

    }
});


export default razorPaySlice.reducer;