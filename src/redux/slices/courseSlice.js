import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../../config/axiosInstance.js'
const initialState = {
   courseList:[]
}

export const getAllCourses = createAsyncThunk('/course/getAllCourse',async(data)=>{
    try {
        const response = axiosInstance.post("/courses",data);
        toast.promise(response,{
            loading: 'wait fetching courses',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to fetch course'
        });
        return await response;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
})




const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{},
    extraReducers:(builder) => {

    }
});

export default courseSlice.reducer;