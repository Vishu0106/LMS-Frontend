import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const intialState = {
    lectures: []
}


export const fetchLectures = createAsyncThunk("/course/lecture/get" , async (cid) => {
    try {
        const response = axiosInstance.get(`/courses/${cid}`);
        toast.promise(response, {
            loading: "Fetching lectures",
            success: "Lectures fetched successfully",
            error: "Failed to fetch lectures"
        });

        return (await response).data;
        
    } catch (error) {
        toast.error("Failed to fetch lectures");
    }
});

export const addCourseLecture = createAsyncThunk("/course/lecture/add" , async (data) => {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("lecture", data.lecture);
        formData.append("description", data.description);

        const response = axiosInstance.post(`/courses/${data.id}`, formData);
        toast.promise(response, {
            loading: "Adding lecture",
            success: "Lecture added successfully",
            error: "Failed to add lecture"
        });
        return (await response).data;
    } catch (error) {
        toast.error("Failed to add lecture");
}
});

export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete" , async (data) => {

    try {
        const response = axiosInstance.delete(`/courses/remove-lecture/${data.courseId}/${data.lectureId}`);
        toast.promise(response, {
            loading: "Deleting lecture",
            success: "Lecture deleted successfully",
            error: "Failed to delete lecture"
        });
        return (await response).data;
    } catch (error) {
        toast.error("Failed to delete lecture");
    }

});



export const lectureSlice = createSlice({
    name: 'lecture',
    initialState: intialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchLectures.fulfilled, (state, action) => {
            state.lectures = action.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures=action.payload?.course?.lectures;
        })
        .addCase(deleteCourseLecture.fulfilled, (state, action) => {
            state.lectures=action.payload?.course?.lectures;
        });
    }
});

export default lectureSlice.reducer;