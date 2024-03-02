import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInatance from '../../axiosInstance.js';

const initialState = {
    allUSersCount: 0,
    SubscriberCount: 0,
}


export const fetchUserStats = createAsyncThunk('/admin/stats/get',async() => {

    try {

        const response = await axiosInatance.get('/admin/stats/users');
        toast.promise(response, {
            loading: 'Fetching user stats',
            success: 'User stats fetched successfully',
            error: 'Failed to fetch user stats'
        });
        return await (response).data;
        
    } catch (error) {
        toast.error('Failed to fetch user stats');
    }

});

 const userStatsSlice = createSlice({
    name: 'userStats',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUserStats.fulfilled, (state, action) => {
            state.allUSersCount = action.payload.allUSersCount;
            state.SubscriberCount = action.payload.SubscriberCount;
        });
    }
});

export default userStatsSlice.reducer;