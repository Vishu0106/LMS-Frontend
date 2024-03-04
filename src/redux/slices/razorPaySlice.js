import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[]
};


export const getRazorPayId = createAsyncThunk("/razorPay/getId" , async () => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        console.log(await response.data);
        return response.data;
    } catch (error){
        toast.error("failed to get the razorpay key.");
    }
});

export const purchaseCourseBundel = createAsyncThunk("/purchaseCourse" , async () => {
    try {
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch (error){
        toast.error(error?.response?.data?.message);
    }
});

export const getPaymentRecord = createAsyncThunk("/payments/record" , async () => {
    try {
        const response =  axiosInstance.get("/payments?count=100");
        toast.promise(response,{
            loading: "Fetching the payment records...",
            success: "Payment records fetched successfully...",
            error: "Failed to fetch payment records..."
        
        })
        return (await response).data;
    } catch (error){
        toast.error(error?.response?.data?.message);
    }
});

export const cancelCourseBundle = createAsyncThunk("/payments/unsubscribe" , async () => {
    try {
        const response = await axiosInstance.post("/payments/unsubscribe");
        toast.promise(response,{
            loading: "Unsubscribing the Bundel...",
            success: (data)=>{
                return  data?.data?.message;
            },
            error: "Failed to unsubscribe the bundel..."
        
        })
        return (await response).data;
    } catch (error){
        toast.error(error?.response?.data?.message);
    }
});

export const verifyUserPayment = createAsyncThunk("/payments/verify" , async (data) => {
    try {
        const response = await axiosInstance.post("/payments/verify",data);
        return response;
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
            toast.error("verification of payment failed. Please try again.");
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled, (state, action) => {
            console.log("payents: razorpay", action?.payload?.allPayments);
            state.allPayments = action?.payload?.allPayments;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            console.log(action?.payload);
        })

    }
});


export default razorPaySlice.reducer;