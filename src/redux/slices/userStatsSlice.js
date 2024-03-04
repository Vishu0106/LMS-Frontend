import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../config/axiosInstance.js';
const initialState = {
    allUsersCount: 0,
    subscriberCount: 0,
}


export const fetchUserStats = createAsyncThunk("stats/get" , async () => {
    try {
        const response =  axiosInstance.get("/admin/stats/users");
        await toast.promise(response,{
            loading: "Fetching the user stats...",
            success: (data)=>{
                return data?.data?.message;
            },
            error: "Failed to fetch user stats..."
        });
        return (await response).data;
    } catch (error){
        console.log("error", error);
        toast.error(error?.response?.data?.message);
    }
})

 const userStatsSlice = createSlice({
    name: 'userStats',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUserStats.fulfilled, (state, action) => {
            console.log("payload", action.payload);
            state.allUsersCount = action.payload?.allUsersCount;
            state.subscriberCount = action.payload?.
            subscribersCount;
            
        });
    }
});

export default userStatsSlice.reducer;