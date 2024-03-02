import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import courseReducer from './slices/courseSlice.js'
import razorpayReducer from './slices/razorpaySlice.js'
import lectureReducer from './slices/lectureSlice.js'
import userStatsSlice from './slices/userStatsSlice.js'

const store = configureStore({
    reducer:{
        auth: authReducer,
        course:courseReducer,
        razorpay: razorpayReducer,
        lecture: lectureReducer,
        userStats: userStatsSlice,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware({serializableCheck:false}),
    devTools:true
});

export default store;