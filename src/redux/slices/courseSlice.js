import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../../config/axiosInstance.js'
const initialState = {
   courseList:[]
}

export const getAllCourses = createAsyncThunk('/course/getAllCourse',async(data)=>{
    try {
        const response = axiosInstance.get("/courses",data);
        toast.promise(response,{
            loading: 'wait fetching courses',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to fetch course'
        });
        return (await response).data.courses;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
})

export const createCourse = createAsyncThunk('/course/create',async(data)=>{
    try {
        const formDATA = new FormData();
        formDATA.append("title",data?.title);
        formDATA.append("description",data?.description)
        formDATA.append("category",data?.category);
        formDATA.append("createdBy",data?.createdBy);
        formDATA.append("thumbnail",data?.thumbnail);

        const response = axiosInstance.post("/courses",formDATA);
        toast.promise(response,{
            loading: 'wait creating courses',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to create course'
        });
        return (await response).data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
})

export const deleteCourse = createAsyncThunk('/course/delete',async(courseId)=>{
    try {
        const response = axiosInstance.delete(`/courses/${courseId}`);
        toast.promise(response,{
            loading: 'wait deleting courses',
            success: 'Course deleted successfully',
            error: 'Failed to delete course'
        });
    
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});





const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getAllCourses.fulfilled,(state, action)=>{
            if(action?.payload) {
                state.courseList = [...action?.payload]
            }
        })
    }
});

export default courseSlice.reducer;
