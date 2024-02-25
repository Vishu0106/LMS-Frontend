import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import courseReducer from './slices/courseSlice.js'
import razorpayReducer from './slices/razorpaySlice.js'

const store = configureStore({
    reducer:{
        auth: authReducer,
        course:courseReducer,
        razorpay: razorpayReducer,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware({serializableCheck:false}),
    devTools:true
});

export default store;